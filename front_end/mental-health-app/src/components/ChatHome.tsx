import * as React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { Message as MessageType } from "./types";

export default function ChatHome() {
  const [messages, setMessages] = React.useState<MessageType[]>([]);

  function onSendMessage(message: string) {
    const newMessage = {
      msg: message,
      fromUser: true,
    };
    setMessages([...messages, newMessage]);
  }
  return (
    <>
      <ChatInput onSendMessage={onSendMessage} />
      <Messages messages={messages} entryID={6586}></Messages>
    </>
  );
}
