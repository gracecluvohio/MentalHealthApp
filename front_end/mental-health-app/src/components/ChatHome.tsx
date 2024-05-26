import * as React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import {Message as MessageType, Session} from "../types.tsx";

interface ChatHomeProps {
    session: Session;
    sendChatMessage: (message?: string, audio?: string) => void;
}

const ChatHome: React.FC<ChatHomeProps> = ({
                                               session,
                                               sendChatMessage,
                                           }) => {

    const messages: MessageType[] = [];
    for (const interaction of session.conversation) {
        if (interaction.user_text !== "" || interaction.user_audio_url !== undefined) {
            messages.push({
                isUser: true,
                text: interaction.user_text,
                audio: interaction.user_audio_url,
            });
        }

        if (interaction.gemini_text !== "" || interaction.gemini_audio_url !== undefined) {
            messages.push({
                isUser: false,
                text: interaction.gemini_text,
                audio: interaction.gemini_audio_url,
            });
        } else {
            messages.push({
                isUser: false,
                text: "...",
                audio: undefined,
            });

        }
    }

    return (
        <>
            <ChatInput sendChatMessage={sendChatMessage}/>
            <Messages messages={messages}></Messages>
            {/**here we need to add t */}
        </>
    );
};

export default ChatHome;
