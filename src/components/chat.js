import { useEffect, useState } from 'react';
import './chat.css';
import { useContext } from 'react';
import { authCon } from '../auth/AuthCon';
import { chatCon } from '../auth/chatCon';
import { Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Messages from './messages';
import { v4 as uuid } from 'uuid';

function Chat() {


  const { currentUser } = useContext(authCon);
  const { data } = useContext(chatCon);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleSend = async () => {
    const sendValue = document.querySelector('.Enter').value;

    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: sendValue,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, 'usersChat', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text: sendValue,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'usersChat', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text: sendValue,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    document.querySelector('.Enter').value = '';
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <span className="user-name-nani">{data.user?.displayName}</span>
      </div>
      <Messages />
      <div className="input-section">
        <input id="Enter" type="text" placeholder="Type something" className="Enter" />

        <div className="option-section">
          <button onClick={handleSend} className="send-button">
            <p>Send</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
