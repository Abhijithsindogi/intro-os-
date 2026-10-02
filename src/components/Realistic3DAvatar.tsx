import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ConversationState } from './InterviewerAvatar.tsx';

interface Realistic3DAvatarProps {
  state: ConversationState;
  getLipSyncData: () => { amplitude: number; vowelFormant: number; isSpeaking: boolean };
  voiceName?: string;
  isCompact?: boolean;
}

export const Realistic3DAvatar: React.FC<Realistic3DAvatarProps> = ({
  state,
  getLipSyncData,
  voiceName = 'Zephyr',
  isCompact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ConversationState>(state);
  stateRef.current = state;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.08);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
    camera.position.set(0, 0.45, 2.75);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Multi-point Physically Based Lighting
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0x181824, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm soft directional light)
    const keyLight = new THREE.DirectionalLight(0xfff2e6, 2.2);
    keyLight.position.set(1.5, 2.2, 2.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light (Cool subtle bluish light)
    const fillLight = new THREE.DirectionalLight(0x8fa8ff, 1.4);
    fillLight.position.set(-1.8, 1.0, 1.8);
    scene.add(fillLight);

    // Rim / Hair Light (Vibrant violet-cyan luxury highlight)
    const rimLight = new THREE.DirectionalLight(0x9d5cff, 3.2);
    rimLight.position.set(0, 2.6, -2.0);
    scene.add(rimLight);

    // Under-chin bounce light (Simulates soft desk/shirt bounce)
    const bounceLight = new THREE.PointLight(0x403060, 1.0, 4);
    bounceLight.position.set(0, -1.0, 1.2);
    scene.add(bounceLight);

    // 3. Materials
    // Procedural Skin PBR Material
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xdec1b0,
      roughness: 0.52,
      metalness: 0.04,
      flatShading: false,
    });

    // Hair Material (Deep charcoal with purple-violet specular sheen)
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x18141f,
      roughness: 0.38,
      metalness: 0.22,
    });

    // Eyes Material (Corneal glossiness)
    const eyeScleraMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f6fa,
      roughness: 0.15,
      metalness: 0.05,
    });

    const eyeIrisMaterial = new THREE.MeshStandardMaterial({
      color: 0x244888,
      roughness: 0.2,
      metalness: 0.35,
    });

    const eyePupilMaterial = new THREE.MeshBasicMaterial({
      color: 0x050508,
    });

    // Suit Material (Luxury Italian charcoal weave)
    const suitMaterial = new THREE.MeshStandardMaterial({
      color: 0x121218,
      roughness: 0.85,
      metalness: 0.1,
    });

    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f2f8,
      roughness: 0.7,
      metalness: 0.05,
    });

    // Lips Material
    const lipMaterial = new THREE.MeshStandardMaterial({
      color: 0xb57878,
      roughness: 0.45,
      metalness: 0.08,
    });

    // Teeth Material
    const teethMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.05,
    });

    // Oral Cavity
    const innerMouthMaterial = new THREE.MeshBasicMaterial({
      color: 0x220508,
    });

    // 4. Character Hierarchy Construction
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Torso / Suit Base
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.65, 1.1, 24);
    const torsoMesh = new THREE.Mesh(torsoGeo, suitMaterial);
    torsoMesh.position.set(0, -0.75, 0);
    torsoMesh.castShadow = true;
    rootGroup.add(torsoMesh);

    // Suit Lapels
    const lapelGeo = new THREE.BoxGeometry(0.12, 0.45, 0.08);
    const leftLapel = new THREE.Mesh(lapelGeo, suitMaterial);
    leftLapel.position.set(-0.16, -0.36, 0.32);
    leftLapel.rotation.set(0.1, 0.15, -0.3);
    rootGroup.add(leftLapel);

    const rightLapel = new THREE.Mesh(lapelGeo, suitMaterial);
    rightLapel.position.set(0.16, -0.36, 0.32);
    rightLapel.rotation.set(0.1, -0.15, 0.3);
    rootGroup.add(rightLapel);

    // Shirt & Tie
    const shirtGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.3, 16);
    const shirtMesh = new THREE.Mesh(shirtGeo, shirtMaterial);
    shirtMesh.position.set(0, -0.25, 0.15);
    rootGroup.add(shirtMesh);

    const tieGeo = new THREE.BoxGeometry(0.06, 0.42, 0.02);
    const tieMat = new THREE.MeshStandardMaterial({ color: 0x6d28d9, roughness: 0.4 });
    const tieMesh = new THREE.Mesh(tieGeo, tieMat);
    tieMesh.position.set(0, -0.42, 0.34);
    rootGroup.add(tieMesh);

    // Head Group (rotates on neck)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.35, 0);
    rootGroup.add(headGroup);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.32, 20);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.set(0, -0.22, 0);
    headGroup.add(neckMesh);

    // Head Base (Cranium & Jaw)
    const headGeo = new THREE.SphereGeometry(0.38, 32, 32);
    headGeo.scale(1.0, 1.25, 1.15);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Hair Styling (PBR layered strands)
    const hairCrownGeo = new THREE.SphereGeometry(0.41, 24, 24);
    hairCrownGeo.scale(1.02, 1.24, 1.18);
    const hairCrown = new THREE.Mesh(hairCrownGeo, hairMaterial);
    hairCrown.position.set(0, 0.08, -0.04);
    headGroup.add(hairCrown);

    // Front Hair Fringe Sweep
    const fringeGeo = new THREE.BoxGeometry(0.5, 0.18, 0.22);
    const fringeMesh = new THREE.Mesh(fringeGeo, hairMaterial);
    fringeMesh.position.set(0.04, 0.38, 0.32);
    fringeMesh.rotation.set(-0.25, 0.12, -0.08);
    headGroup.add(fringeMesh);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.06, 0.18, 12);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.position.set(0, 0.04, 0.44);
    noseMesh.rotation.set(0.2, 0, 0);
    headGroup.add(noseMesh);

    // 5. Realistic Eyes with Dynamic Pupils and Eyelids
    const eyeGroupLeft = new THREE.Group();
    eyeGroupLeft.position.set(-0.14, 0.12, 0.36);
    headGroup.add(eyeGroupLeft);

    const eyeGroupRight = new THREE.Group();
    eyeGroupRight.position.set(0.14, 0.12, 0.36);
    headGroup.add(eyeGroupRight);

    // Sclera (Eyeball)
    const eyeBallGeo = new THREE.SphereGeometry(0.062, 20, 20);
    const eyeBallL = new THREE.Mesh(eyeBallGeo, eyeScleraMaterial);
    eyeGroupLeft.add(eyeBallL);
    const eyeBallR = new THREE.Mesh(eyeBallGeo, eyeScleraMaterial);
    eyeGroupRight.add(eyeBallR);

    // Iris & Pupil (Look target)
    const irisGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.01, 16);
    irisGeo.rotateX(Math.PI / 2);
    const pupilGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.012, 16);
    pupilGeo.rotateX(Math.PI / 2);

    const irisMeshL = new THREE.Mesh(irisGeo, eyeIrisMaterial);
    irisMeshL.position.set(0, 0, 0.055);
    eyeGroupLeft.add(irisMeshL);
    const pupilMeshL = new THREE.Mesh(pupilGeo, eyePupilMaterial);
    pupilMeshL.position.set(0, 0, 0.057);
    eyeGroupLeft.add(pupilMeshL);

    const irisMeshR = new THREE.Mesh(irisGeo, eyeIrisMaterial);
    irisMeshR.position.set(0, 0, 0.055);
    eyeGroupRight.add(irisMeshR);
    const pupilMeshR = new THREE.Mesh(pupilGeo, eyePupilMaterial);
    pupilMeshR.position.set(0, 0, 0.057);
    eyeGroupRight.add(pupilMeshR);

    // Dynamic Eyelids (Blinking)
    const eyelidGeo = new THREE.SphereGeometry(0.066, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const eyelidL = new THREE.Mesh(eyelidGeo, skinMaterial);
    eyelidL.rotation.x = -Math.PI / 2;
    eyeGroupLeft.add(eyelidL);

    const eyelidR = new THREE.Mesh(eyelidGeo, skinMaterial);
    eyelidR.rotation.x = -Math.PI / 2;
    eyeGroupRight.add(eyelidR);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.14, 0.024, 0.03);
    const browL = new THREE.Mesh(browGeo, hairMaterial);
    browL.position.set(-0.15, 0.22, 0.4);
    browL.rotation.set(0.05, 0.1, 0.12);
    headGroup.add(browL);

    const browR = new THREE.Mesh(browGeo, hairMaterial);
    browR.position.set(0.15, 0.22, 0.4);
    browR.rotation.set(0.05, -0.1, -0.12);
    headGroup.add(browR);

    // 6. Layered Mouth & Viseme Morph Engine
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.16, 0.38);
    headGroup.add(mouthGroup);

    // Inner oral cavity
    const oralCavityGeo = new THREE.BoxGeometry(0.18, 0.08, 0.08);
    const oralCavity = new THREE.Mesh(oralCavityGeo, innerMouthMaterial);
    oralCavity.position.set(0, 0, -0.04);
    mouthGroup.add(oralCavity);

    // Upper Teeth
    const teethGeo = new THREE.BoxGeometry(0.14, 0.03, 0.04);
    const teethMesh = new THREE.Mesh(teethGeo, teethMaterial);
    teethMesh.position.set(0, 0.015, -0.01);
    teethMesh.visible = false;
    mouthGroup.add(teethMesh);

    // Upper Lip Mesh
    const upperLipGeo = new THREE.BoxGeometry(0.16, 0.03, 0.04);
    const upperLip = new THREE.Mesh(upperLipGeo, lipMaterial);
    upperLip.position.set(0, 0.02, 0.02);
    mouthGroup.add(upperLip);

    // Lower Lip Mesh (Drives jaw opening for Visemes)
    const lowerLipGeo = new THREE.BoxGeometry(0.16, 0.035, 0.04);
    const lowerLip = new THREE.Mesh(lowerLipGeo, lipMaterial);
    lowerLip.position.set(0, -0.02, 0.02);
    mouthGroup.add(lowerLip);

    // 7. State & Viseme Animation Loop
    let animId = 0;
    let blinkStage = 0; // 0=idle, 1=closing, 2=opening
    let blinkValue = 0;
    let nextBlinkTime = performance.now() + 2500;
    let nodProgress = 0;
    let nextNodTime = performance.now() + 4000;
    let currentJawOpen = 0;
    let currentMouthWidth = 1.0;
    let currentMouthPucker = 0;
    let eyeSaccadeX = 0;
    let eyeSaccadeY = 0;
    let nextSaccadeTime = performance.now() + 1800;

    const animate = (timestamp: number) => {
      const currentState = stateRef.current;

      // Saccadic eye movements (tiny natural human micro-focus shifts)
      if (timestamp > nextSaccadeTime) {
        eyeSaccadeX = (Math.random() - 0.5) * 0.08;
        eyeSaccadeY = (Math.random() - 0.5) * 0.05;
        nextSaccadeTime = timestamp + 1400 + Math.random() * 2200;
      }

      // Smooth gaze tracking towards candidate
      irisMeshL.position.x = THREE.MathUtils.lerp(irisMeshL.position.x, eyeSaccadeX, 0.1);
      irisMeshL.position.y = THREE.MathUtils.lerp(irisMeshL.position.y, eyeSaccadeY, 0.1);
      pupilMeshL.position.x = irisMeshL.position.x;
      pupilMeshL.position.y = irisMeshL.position.y;

      irisMeshR.position.x = THREE.MathUtils.lerp(irisMeshR.position.x, eyeSaccadeX, 0.1);
      irisMeshR.position.y = THREE.MathUtils.lerp(irisMeshR.position.y, eyeSaccadeY, 0.1);
      pupilMeshR.position.x = irisMeshR.position.x;
      pupilMeshR.position.y = irisMeshR.position.y;

      // Natural Eyelid Blinking
      if (timestamp > nextBlinkTime && blinkStage === 0) {
        blinkStage = 1;
      }
      if (blinkStage === 1) {
        blinkValue += 0.24;
        if (blinkValue >= 1) {
          blinkValue = 1;
          blinkStage = 2;
        }
      } else if (blinkStage === 2) {
        blinkValue -= 0.2;
        if (blinkValue <= 0) {
          blinkValue = 0;
          blinkStage = 0;
          nextBlinkTime = timestamp + 2800 + Math.random() * 3200;
        }
      }
      eyelidL.rotation.x = -Math.PI / 2 + blinkValue * 1.55;
      eyelidR.rotation.x = -Math.PI / 2 + blinkValue * 1.55;

      // Micro-Breathing Motion (chest and head)
      const breath = Math.sin(timestamp * 0.0016) * 0.012;
      torsoMesh.position.y = -0.75 + breath * 0.5;

      // Head Posture based on Conversation State
      if (currentState === 'LISTENING') {
        // Subtle nodding while listening to candidate
        if (timestamp > nextNodTime && nodProgress === 0) {
          nodProgress = 0.01;
        }
        if (nodProgress > 0) {
          nodProgress += 0.05;
          const nodAngle = Math.sin(nodProgress * Math.PI) * 0.08;
          headGroup.rotation.x = 0.02 + nodAngle;
          if (nodProgress >= 1) {
            nodProgress = 0;
            nextNodTime = timestamp + 3500 + Math.random() * 2500;
          }
        } else {
          headGroup.rotation.x = 0.02;
        }
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, 0.03, 0.05);
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, -0.01, 0.05);
        browL.position.y = THREE.MathUtils.lerp(browL.position.y, 0.23, 0.08); // curious brow
        browR.position.y = THREE.MathUtils.lerp(browR.position.y, 0.23, 0.08);
      } else if (currentState === 'USER_SPEAKING') {
        // Attentive engaged head tilt
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, 0.04, 0.08);
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, 0.04, 0.08);
        browL.position.y = THREE.MathUtils.lerp(browL.position.y, 0.235, 0.08);
        browR.position.y = THREE.MathUtils.lerp(browR.position.y, 0.235, 0.08);
      } else if (currentState === 'AI_PROCESSING') {
        // Thoughtful thinking pose (slight upward tilt and look away)
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -0.04, 0.05);
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, -0.06, 0.05);
        browL.position.y = THREE.MathUtils.lerp(browL.position.y, 0.21, 0.05);
        browR.position.y = THREE.MathUtils.lerp(browR.position.y, 0.21, 0.05);
      } else if (currentState === 'AI_SPEAKING') {
        // Natural speech rhythm cadence
        const speechRhythm = Math.sin(timestamp * 0.006) * 0.03;
        const tiltRhythm = Math.cos(timestamp * 0.0035) * 0.025;
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, speechRhythm, 0.1);
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, tiltRhythm, 0.1);
        browL.position.y = THREE.MathUtils.lerp(browL.position.y, 0.22 + speechRhythm * 0.2, 0.1);
        browR.position.y = THREE.MathUtils.lerp(browR.position.y, 0.22 + speechRhythm * 0.2, 0.1);
      } else {
        // Neutral / Ready
        headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, 0, 0.05);
        headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, 0, 0.05);
        headGroup.rotation.z = THREE.MathUtils.lerp(headGroup.rotation.z, 0, 0.05);
      }

      // 8. Layered Viseme Lip-Sync System
      if (currentState === 'AI_SPEAKING') {
        const { amplitude, vowelFormant, isSpeaking } = getLipSyncData();

        if (isSpeaking) {
          // Level 1: Audio Envelope (Jaw height)
          const targetJaw = Math.min(0.09, amplitude * 0.16);

          // Level 2: Visemes (Formant-derived mouth width & rounding)
          // Higher formant ratio = spread vowels like "E", "aa"
          // Lower formant ratio = rounded vowels like "oh", "ou"
          const targetWidth = 1.0 + vowelFormant * 0.45;
          const targetPucker = (1.0 - vowelFormant) * 0.2;

          // Level 3: Damping smoothing
          currentJawOpen = THREE.MathUtils.lerp(currentJawOpen, targetJaw, 0.45);
          currentMouthWidth = THREE.MathUtils.lerp(currentMouthWidth, targetWidth, 0.35);
          currentMouthPucker = THREE.MathUtils.lerp(currentMouthPucker, targetPucker, 0.35);

          teethMesh.visible = currentJawOpen > 0.02;
        } else {
          currentJawOpen = THREE.MathUtils.lerp(currentJawOpen, 0, 0.5);
          currentMouthWidth = THREE.MathUtils.lerp(currentMouthWidth, 1.0, 0.4);
          teethMesh.visible = false;
        }
      } else {
        // INSTANT BARGE-IN INTERRUPTION: smoothly and immediately return to neutral
        currentJawOpen = THREE.MathUtils.lerp(currentJawOpen, 0, 0.6);
        currentMouthWidth = THREE.MathUtils.lerp(currentMouthWidth, 1.0, 0.5);
        teethMesh.visible = false;
      }

      // Apply morphing to lower lip and upper lip
      lowerLip.position.y = -0.02 - currentJawOpen;
      lowerLip.scale.x = currentMouthWidth;
      upperLip.scale.x = currentMouthWidth;
      oralCavity.scale.y = Math.max(0.2, currentJawOpen * 14);

      // Render frame
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement) {
        try {
          container.removeChild(renderer.domElement);
        } catch {}
      }
    };
  }, [getLipSyncData]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${isCompact ? 'w-48 h-48' : 'w-full max-w-[460px] aspect-square'}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full relative z-10 overflow-hidden rounded-full" />

      {/* Floating Status Pill */}
      <div className="mt-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-xs text-white/90 z-20 shadow-xl">
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              state === 'AI_SPEAKING'
                ? 'bg-violet-400'
                : state === 'LISTENING' || state === 'USER_SPEAKING'
                ? 'bg-emerald-400'
                : state === 'AI_PROCESSING'
                ? 'bg-amber-400'
                : 'bg-white/40'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              state === 'AI_SPEAKING'
                ? 'bg-violet-500'
                : state === 'LISTENING' || state === 'USER_SPEAKING'
                ? 'bg-emerald-500'
                : state === 'AI_PROCESSING'
                ? 'bg-amber-500'
                : 'bg-white/60'
            }`}
          />
        </span>
        <span className="font-medium tracking-wide">
          {state === 'AI_SPEAKING' && 'AI Speaking'}
          {state === 'LISTENING' && 'Listening to you...'}
          {state === 'USER_SPEAKING' && 'Hearing your voice...'}
          {state === 'AI_PROCESSING' && 'Thinking...'}
          {state === 'CONNECTING' && 'Connecting to Gemini Live...'}
          {state === 'READY' && 'Ready to speak'}
          {state === 'INTERRUPTED' && 'Interrupted — listening'}
          {state === 'ERROR' && 'Connection issue'}
          {state === 'DISCONNECTED' && 'Disconnected'}
          {state === 'ENDING' && 'Concluding interview...'}
        </span>
        <span className="text-[10px] text-white/40 pl-1 border-l border-white/20">
          {voiceName}
        </span>
      </div>
    </div>
  );
};
