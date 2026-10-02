/**
 * Web Audio API Manager for Interview.OS
 * - 16kHz microphone capture & PCM16 encoding for Gemini Live
 * - 24kHz raw PCM16 playback with seamless chunk scheduling
 * - Barge-in instant interruption support
 * - Real-time frequency & amplitude analyser for avatar lip-sync
 */

export class AudioManager {
  private inputAudioCtx: AudioContext | null = null;
  private outputAudioCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private activeSources: Set<AudioBufferSourceNode> = new Set();
  private nextStartTime: number = 0;
  private isMicMuted: boolean = false;
  private isOutputMuted: boolean = false;

  private onAudioChunkCallback?: (base64Pcm: string) => void;
  private onUserSpeakingCallback?: (isSpeaking: boolean, rms: number) => void;

  constructor() {}

  /**
   * Initialize microphone capture and playback audio contexts
   */
  async startMicrophone(
    onChunk: (base64Pcm: string) => void,
    onUserSpeaking?: (isSpeaking: boolean, rms: number) => void
  ) {
    this.onAudioChunkCallback = onChunk;
    this.onUserSpeakingCallback = onUserSpeaking;

    // Output AudioContext at 24kHz for Gemini Live audio
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    this.outputAudioCtx = new AudioCtxClass({ sampleRate: 24000 });

    if (this.outputAudioCtx.state === 'suspended') {
      await this.outputAudioCtx.resume();
    }

    // Set up AnalyserNode for lip-sync & visualizer
    this.analyser = this.outputAudioCtx.createAnalyser();
    this.analyser.fftSize = 512;
    this.analyser.smoothingTimeConstant = 0.4;

    this.gainNode = this.outputAudioCtx.createGain();
    this.gainNode.gain.value = 1.0;

    this.analyser.connect(this.gainNode);
    this.gainNode.connect(this.outputAudioCtx.destination);

    // Request microphone access
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        channelCount: 1,
        sampleRate: 16000,
      },
    });

    // Input AudioContext at 16kHz for Gemini speech recognition
    this.inputAudioCtx = new AudioCtxClass({ sampleRate: 16000 });
    if (this.inputAudioCtx.state === 'suspended') {
      await this.inputAudioCtx.resume();
    }

    const source = this.inputAudioCtx.createMediaStreamSource(this.mediaStream);
    // Buffer size 2048 samples (~128ms per chunk at 16kHz)
    this.scriptProcessor = this.inputAudioCtx.createScriptProcessor(2048, 1, 1);

    this.scriptProcessor.onaudioprocess = (e) => {
      if (this.isMicMuted) return;

      const inputData = e.inputBuffer.getChannelData(0);

      // Compute RMS to detect candidate speech for instant interruption
      let sum = 0;
      for (let i = 0; i < inputData.length; i++) {
        sum += inputData[i] * inputData[i];
      }
      const rms = Math.sqrt(sum / inputData.length);
      const isSpeaking = rms > 0.04;

      if (this.onUserSpeakingCallback) {
        this.onUserSpeakingCallback(isSpeaking, rms);
      }

      // Encode float32 samples to 16-bit PCM LE
      const pcm16Buffer = this.floatTo16BitPCM(inputData);
      const base64 = this.arrayBufferToBase64(pcm16Buffer);

      if (this.onAudioChunkCallback) {
        this.onAudioChunkCallback(base64);
      }
    };

    source.connect(this.scriptProcessor);
    this.scriptProcessor.connect(this.inputAudioCtx.destination);
  }

  /**
   * Playback 24kHz raw PCM chunk from Gemini Live
   */
  playChunk(base64Data: string) {
    if (!this.outputAudioCtx || !this.analyser) return;

    if (this.outputAudioCtx.state === 'suspended') {
      this.outputAudioCtx.resume();
    }

    // Decode base64 to binary
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    // Convert raw 16-bit PCM to Float32
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768.0;
    }

    const audioBuffer = this.outputAudioCtx.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);

    const source = this.outputAudioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.analyser);

    // Track active sources to stop them instantly if interrupted
    this.activeSources.add(source);
    source.onended = () => {
      this.activeSources.delete(source);
    };

    const currentTime = this.outputAudioCtx.currentTime;
    if (this.nextStartTime < currentTime) {
      this.nextStartTime = currentTime;
    }

    source.start(this.nextStartTime);
    this.nextStartTime += audioBuffer.duration;
  }

  /**
   * Barge-in interruption: immediately stops all playing and scheduled audio
   */
  stopPlayback() {
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch {}
    }
    this.activeSources.clear();
    if (this.outputAudioCtx) {
      this.nextStartTime = this.outputAudioCtx.currentTime;
    }
  }

  /**
   * Real-time Lip Sync telemetry for avatar animation
   */
  getLipSyncData(): { amplitude: number; vowelFormant: number; isSpeaking: boolean } {
    if (!this.analyser || this.activeSources.size === 0) {
      return { amplitude: 0, vowelFormant: 0, isSpeaking: false };
    }

    const freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(freqData);

    // Calculate overall amplitude
    let total = 0;
    for (let i = 0; i < freqData.length; i++) {
      total += freqData[i];
    }
    const avg = total / freqData.length;
    const normalizedAmp = Math.min(1.0, avg / 120);

    // Formant estimation (comparing low-mid vs high speech frequencies)
    // Low band (vowels like 'ah', 'oh'): bin 2 to 16 (~100Hz - 1kHz)
    // High band (consonants like 's', 't', 'ee'): bin 17 to 48 (~1kHz - 3kHz)
    let lowTotal = 0;
    for (let i = 2; i < 16; i++) lowTotal += freqData[i];
    const lowAvg = lowTotal / 14;

    let highTotal = 0;
    for (let i = 17; i < 48; i++) highTotal += freqData[i];
    const highAvg = highTotal / 31;

    const formant = lowAvg > 0 ? Math.min(1.0, highAvg / (lowAvg + 1)) : 0;

    return {
      amplitude: normalizedAmp,
      vowelFormant: formant,
      isSpeaking: normalizedAmp > 0.03,
    };
  }

  toggleMic(muted?: boolean): boolean {
    if (muted !== undefined) {
      this.isMicMuted = muted;
    } else {
      this.isMicMuted = !this.isMicMuted;
    }
    if (this.mediaStream) {
      this.mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !this.isMicMuted;
      });
    }
    return this.isMicMuted;
  }

  toggleSpeaker(muted?: boolean): boolean {
    if (muted !== undefined) {
      this.isOutputMuted = muted;
    } else {
      this.isOutputMuted = !this.isOutputMuted;
    }
    if (this.gainNode) {
      this.gainNode.gain.value = this.isOutputMuted ? 0 : 1.0;
    }
    return this.isOutputMuted;
  }

  getMicMuted(): boolean {
    return this.isMicMuted;
  }

  getSpeakerMuted(): boolean {
    return this.isOutputMuted;
  }

  destroy() {
    this.stopPlayback();
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
    if (this.inputAudioCtx) {
      this.inputAudioCtx.close();
      this.inputAudioCtx = null;
    }
    if (this.outputAudioCtx) {
      this.outputAudioCtx.close();
      this.outputAudioCtx = null;
    }
  }

  private floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output.buffer;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
