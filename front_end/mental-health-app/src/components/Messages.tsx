import React, { useEffect, useRef } from "react";
import Message from "./Message"; // Assuming Message is in the same directory
import { Message as MessageType } from "./types";

interface Props {
  messages: MessageType[];
  entryID: number;
}

const Messages: React.FC<Props> = ({ messages, entryID }) => {
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
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
        right: "0",
        width: "calc(100% - 400px)",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      {messages.map((m, index) => (
        <Message
          key={`${entryID}-${index}`}
          msg={m.msg}
          fromUser={m.fromUser}
          entryID={entryID}
          index={index}
        />
      ))}
      <div ref={bottomRef}></div>
    </ol>
  );
};

export default Messages;
