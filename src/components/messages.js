import { useContext, useEffect, useState } from "react";
import Message2 from "./message";
import './message.css';
import { chatCon } from "../auth/chatCon";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(chatCon);
  console.log(messages)
  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      } else {
        setMessages([]); // Handle the case where the document doesn't exist
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message2 message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
