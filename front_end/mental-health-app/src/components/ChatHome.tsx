import * as React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { Message as MessageType } from "./types";

interface ChatHomeProps {
  entryID: number;
  entries: Record<number, Date>;
}

const ChatHome: React.FC<ChatHomeProps> = ({ entryID, entries }) => {
  const [messages, setMessages] = React.useState<MessageType[][]>([]);
  //   console.log(messages);
  //   console.log(entryID);
  //   console.log(messages[entryID]);

  function onSendMessage(message: string) {
    const newMessage = {
      msg: message,
      fromUser: true,
    };
    if (typeof messages[entryID] === "undefined") {
      //   console.log(messages, entryID);
      const newList = messages.slice();
      newList[entryID] = [newMessage];
      //   console.log(newList);
      setMessages(newList);
    } else {
      setMessages(
        messages.map((val, index) => {
          if (index == entryID) return (val || []).concat([newMessage]);
          else return val;
        })
      );
    }
  }
  return (
    <>
      <ChatInput
        onSendMessage={onSendMessage}
        entries={entries}
        entryID={entryID}
      />
      <Messages messages={messages[entryID] ?? []} entryID={entryID}></Messages>
    </>
  );
};

export default ChatHome;
