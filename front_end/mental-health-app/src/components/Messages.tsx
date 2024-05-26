import React, {useEffect, useRef} from "react";
import Message from "./Message"; // Assuming Message is in the same directory
import {Message as MessageType} from "../types.tsx";

interface Props {
    messages: MessageType[];
}

const Messages: React.FC<Props> = ({messages}) => {
    const bottomRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef && bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    return (
        <ol
            style={{
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                bottom: "100px",
                right: "20px",
                left: "300px",
                // width: "calc(100% - 400px)",
                maxHeight: "70vh",
                overflowY: "auto",
            }}
        >
            {messages.map((m) => (
                <Message
                    key={`${m.text}-${m.audio}-${m.isUser}`}
                    msg={m.text}
                    audioUrl={m.audio}
                    fromUser={m.isUser}
                />
            ))}
            <div ref={bottomRef}></div>
        </ol>
    );
};

export default Messages;
