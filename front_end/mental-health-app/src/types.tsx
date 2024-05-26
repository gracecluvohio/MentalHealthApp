import * as React from "react";

export interface IconMapping {
    [key: number]: React.ReactElement;
}

export enum Mood {
    none = 0,
    anger,
    fear,
    joy,
    love,
    sadness,
    surprise,
}

export interface Session {
    mood: Mood;
    conversation: Interaction[];
}

export interface Interaction {
    user_text: string;
    gemini_text: string;
    user_audio_url: string | undefined;
    gemini_audio_url: string | undefined;
}


export interface Message {
    isUser: boolean;
    text: string | undefined;
    audio: string | undefined;
}
