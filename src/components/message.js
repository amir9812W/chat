import { useContext } from 'react'
import { authCon } from '../auth/AuthCon'
import { chatCon } from '../auth/chatCon'

const Message2 = ({ message }) => {
  const {currentUser} = useContext(authCon)
  const {data} = useContext(chatCon)
  console.log(currentUser)
  return (
    <div className = {`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='section1'>
        <img
          src={message.senderId === currentUser.uid?
            currentUser.photoURL:
            data.user.photoURL
          }
          width={'50px'}
          height={'50px'}
          className='sender'
          alt={''}
        />
      </div>
        <p className='chat-content'>{message.text}</p>
    </div>
  
  )
}

export default Message2
