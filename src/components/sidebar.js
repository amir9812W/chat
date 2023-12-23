import React, { useEffect } from 'react'
import  { useContext , useState} from 'react'
import './sideBar.css'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { authCon } from '../auth/AuthCon' 
import { collection,getDoc,getDocs, query, where, serverTimestamp,setDoc,doc,updateDoc} from "firebase/firestore";
import { db } from '../firebase'
import { onSnapshot } from 'firebase/firestore'
import { chatCon } from '../auth/chatCon'



function Sidebar() {

  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null) 
  const [err1,setErr] = useState(false)

  const {currentUser} = useContext(authCon)

  const handleSearch = async() => {
    const q = query(collection(db, 'users'), 
    where('displayName', '==', userName));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(err){
      setErr(true)
      console.log(err)
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  }

  const handleSelect = async() => {
    const combinedId = currentUser.uid > user.uid ?
     currentUser.uid + user.uid 
    : user.uid + currentUser.uid;

    try{
      const res = await getDoc(doc(db, 'chats', combinedId))

      if(!res.exists()){
        await setDoc(doc(db, 'chats', combinedId), 
        {messages: []})

        await updateDoc(doc(db, 'usersChat', currentUser.uid),{
          [combinedId + ".userInfo"] : {
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+'.date'] : serverTimestamp()
        });

        await updateDoc(doc(db, 'usersChat',user.uid),{
          [combinedId + ".userInfo"] : {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+'.date'] : serverTimestamp()
        })

      }
      
    }catch(err){
      console.log('litreally fuck firebase')
    }


    setUser(null)
    setUserName('')
  }

  const [chats, setChats] = useState([])
  const {dispatch} = useContext(chatCon)

  useEffect(()=>{
    const getChats = () => {

      const unsub = onSnapshot(doc(db,'usersChat',currentUser.uid),(doc)=>{
        setChats(doc.data())
      })
      return ()=> {
        unsub();
      };
    }
    currentUser.uid && getChats()
  },[currentUser.uid])

  const handleSelect2 = (u) => {
    dispatch({type :'CHANGE_USER', payload:u})
  }

  return(
    <div className='side-bar'>
      <div className='side-bar-header'>

        <span className='logo'>Nani Up</span>

        <div className='info-section'>
          <img
            src={currentUser.photoURL}
            className='profile-img'
            alt='nanisure'
          />

          <p className='id-name'>
           {currentUser.displayName}
          </p>

          <button className='log-out-button' onClick={()=>signOut(auth)}>LogOut</button>
        </div>
      </div>

      <div className='search-section'>
        <input 
          placeholder='Find a User'
          type='text'
          className='search-input'
          onChange={e => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
        />
        {err1 && <span>User Not found</span>}
        {user && 
          <div className='userChat'  onClick={handleSelect}>
            <img src={user.photoURL} width='50px' height='50px' className = 'image-recieve' alt='' 
           />
            <div className='userChatInfo'>
              <span>{user.displayName}</span>
            </div>
          </div>
        }
      </div>

      <div className='users-section'>
        {Object.entries(chats)?.map((chat)=> (
          <div
            className='user'
            key={chat[0]}
            onClick={()=>handleSelect2(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt = '' className='profile-img'/>
            <div className='data'>
              <span className='user-name'>
                  {chat[1].userInfo.displayName}
                  </span>
                <p className='message'>
                {chat[1].lastMessage?.text}
                </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  ) 
}


export default Sidebar
