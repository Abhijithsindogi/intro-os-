import React from 'react';
import { Realistic3DAvatar } from './Realistic3DAvatar.tsx';

export type ConversationState =
  | 'CONNECTING'
  | 'READY'
  | 'AI_SPEAKING'
  | 'LISTENING'
  | 'USER_SPEAKING'
  | 'AI_PROCESSING'
  | 'INTERRUPTED'
  | 'ENDING'
  | 'DISCONNECTED'
  | 'ERROR';

export interface InterviewerAvatarProps {
  state: ConversationState;
  getLipSyncData: () => { amplitude: number; vowelFormant: number; isSpeaking: boolean };
  voiceName?: string;
  isCompact?: boolean;
}

export const InterviewerAvatar: React.FC<InterviewerAvatarProps> = ({
  state,
  getLipSyncData,
  voiceName = 'Zephyr',
  isCompact = false,
}) => {
  return (
    <Realistic3DAvatar
      state={state}
      getLipSyncData={getLipSyncData}
      voiceName={voiceName}
      isCompact={isCompact}
    />
  );
};
