import * as React from "react";
import API from "../api/API";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { Message as MessageType } from "./types";

interface ChatHomeProps {
  entryID: number;
  entries: Record<number, Date>;
  initialData: any;
}

const ChatHome: React.FC<ChatHomeProps> = ({
  entryID,
  entries,
  initialData,
}) => {
  const [messages, setMessages] = React.useState<MessageType[][]>([]);
  //   console.log(messages);
  //   console.log(entryID);
  //   console.log(messages[entryID]);

  if (messages.length == 0) {
    initialData;
    // TODO POPULATE messages USE initialData
  }

  async function onSendMessage(message: string) {
    const newMessage = {
      msg: message,
      fromUser: true,
    };
    try {
      const serverOut = await API.sendChatMessage(
        "user",
        entries[entryID],
        undefined,
        message
      );
      console.log(serverOut);
      const geminiMsg = {
        msg: serverOut.gemini_text,
        fromUser: false,
        // TRISTAP TEST
        audioUrl:
          "https://res.cloudinary.com/dijcxemmw/raw/upload/v1716689396/tezolrv1mfcm0lpferjq.wav",
        // audioUrl: serverOut.gemini_audio_url,
      };
      console.log(geminiMsg);
      await API.setMood("user", entries[entryID], serverOut.mood);
      if (typeof messages[entryID] === "undefined") {
        //   console.log(messages, entryID);
        const newList = messages.slice();
        newList[entryID] = [newMessage, geminiMsg];
        //   console.log(newList);
        setMessages(newList);
      } else {
        setMessages(
          messages.map((val, index) => {
            if (index == entryID)
              return (val || []).concat([newMessage, geminiMsg]);
            else return val;
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <ChatInput onSendMessage={onSendMessage} />
      <Messages messages={messages[entryID] ?? []} entryID={entryID}></Messages>
      {/**here we need to add t */}
    </>
  );
};

export default ChatHome;
