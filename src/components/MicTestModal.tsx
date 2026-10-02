import React, { useState, useEffect, useRef } from 'react';

interface MicTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadyToStart: () => void;
}

export const MicTestModal: React.FC<MicTestModalProps> = ({
  isOpen,
  onClose,
  onReadyToStart,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [micLevel, setMicLevel] = useState(0); // 0 to 100
  const [isRecordingSample, setIsRecordingSample] = useState(false);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [hasRecordedSample, setHasRecordedSample] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      initMic();
    } else {
      cleanup();
    }
    return () => cleanup();
  }, [isOpen]);

  const cleanup = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
      audioPlaybackRef.current = null;
    }
    setMicLevel(0);
    setIsRecordingSample(false);
    setIsPlayingSample(false);
  };

  const initMic = async () => {
    setPermissionStatus('requesting');
    setErrorMessage(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      setPermissionStatus('granted');

      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMeter = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setMicLevel(normalized);

        animFrameRef.current = requestAnimationFrame(updateMeter);
      };

      animFrameRef.current = requestAnimationFrame(updateMeter);
    } catch (err: any) {
      console.error('Mic check error:', err);
      setPermissionStatus('denied');
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Microphone permission was denied in your browser settings. Please enable microphone access to speak with Gemini.'
          : 'Could not access microphone hardware. Please check your sound settings.'
      );
    }
  };

  const recordSample = () => {
    if (!streamRef.current) return;
    recordedChunksRef.current = [];
    setIsRecordingSample(true);
    setHasRecordedSample(false);

    try {
      const recorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        setIsRecordingSample(false);
        setHasRecordedSample(true);
      };

      recorder.start();
      // Record for 3.5 seconds
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 3500);
    } catch (e) {
      console.warn('MediaRecorder error:', e);
      setIsRecordingSample(false);
    }
  };

  const playSample = () => {
    if (recordedChunksRef.current.length === 0) return;
    const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioPlaybackRef.current = audio;

    setIsPlayingSample(true);
    audio.onended = () => setIsPlayingSample(false);
    audio.play();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-lg rounded-3xl bg-[#0f0f16] border border-white/15 p-6 sm:p-7 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300">
              🎙️
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Audio & Mic Diagnostic</h2>
              <p className="text-xs text-white/50">Verify your voice clarity before starting the live interview.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 text-lg">
            ✕
          </button>
        </div>

        {/* Status / Level Indicator */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70 font-medium">Input Volume Level</span>
            <span
              className={`font-semibold ${
                micLevel > 15 ? 'text-emerald-400' : 'text-white/40'
              }`}
            >
              {micLevel > 15 ? 'Clear Audio Detected' : 'Speak to test...'}
            </span>
          </div>

          {/* Dynamic Audio Bar */}
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-75 ${
                micLevel > 65
                  ? 'bg-amber-400'
                  : micLevel > 10
                  ? 'bg-gradient-to-r from-emerald-500 to-violet-400'
                  : 'bg-white/20'
              }`}
              style={{ width: `${Math.max(4, micLevel)}%` }}
            />
          </div>

          {/* Mic Tips */}
          <div className="flex items-center justify-between text-[11px] text-white/40">
            <span>Too Quiet</span>
            <span className="text-emerald-400 font-medium">Optimal Speaking Zone</span>
            <span>Too Loud</span>
          </div>
        </div>

        {/* 3-Second Audio Echo Check */}
        <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-violet-300">Hear Yourself</span>
              <p className="text-[11px] text-white/60">
                Record a quick 3-second phrase like: <em>"Hello, my name is Alex and I study Computer Science."</em>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={recordSample}
              disabled={isRecordingSample || permissionStatus !== 'granted'}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                isRecordingSample
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-white/10 hover:bg-white/15 text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isRecordingSample ? 'bg-white' : 'bg-red-400'}`} />
              <span>{isRecordingSample ? 'Recording 3s...' : 'Record Test Clip'}</span>
            </button>

            {hasRecordedSample && (
              <button
                onClick={playSample}
                disabled={isPlayingSample}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/40 transition-colors flex items-center gap-2"
              >
                <span>{isPlayingSample ? 'Playing...' : '▶ Playback Sound'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onReadyToStart();
            }}
            disabled={permissionStatus === 'denied'}
            className="orbit-btn solid px-5 py-2 text-xs font-semibold"
          >
            I'm Ready — Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};
