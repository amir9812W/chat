import './App.css';
import add from '../images/icon-add.png'
import { auth} from '../firebase'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { useState } from 'react'
import { storage } from '../firebase'
import { uploadBytesResumable, getDownloadURL,ref } from 'firebase/storage'
import { doc, setDoc , getFirestore} from "firebase/firestore";
import { useNavigate , Link } from 'react-router-dom';


function SignUp() {
  const db = getFirestore()
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const [progress, setProgress] = useState(0)
  const firstTwoDigits = Number(progress.toFixed(2));

  const handleSubmit = async (event)=> {
    event.preventDefault()
    const displayName1 = event.target[0].value
    const email = event.target[1].value
    const passWord = event.target[2].value
    const file = event.target[3].files[0]
    try{
      const res = await createUserWithEmailAndPassword(auth, email, passWord)
      console.log(res.user)
      const refrence = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(refrence, file)
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           
            setProgress(progress1)
            console.log(progress1)
            switch (snapshot.state) {
              case 'paused':
                break;
              case 'running':
                break;
            }
          }, 
          (err) => {
            setErr(true)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {

              await updateProfile(res.user,{
                displayName : displayName1,
                photoURL : downloadURL
              });

              await setDoc(doc(db, "users", res.user.uid), {
                uid : res.user.uid,
                displayName : displayName1,
                email,
                photoURL : downloadURL
              });
              
            await setDoc(doc(db, 'usersChat', res.user.uid), {})
            navigate('/')
            });
          }
        );
    }catch(err){
      setErr(true)
      console.log(err)
    }
  }

  let data = true

  function darkMode() {
  
    if (data === true){
      document.querySelector('.circle').classList.add('circle-darkmode')
      document.querySelector('.light-mode').classList.add('dark-mode')
      document.querySelector('.App').classList.add('app-darkmode')
      data = false
    }else{
      document.querySelector('.circle').classList.remove('circle-darkmode')
      document.querySelector('.light-mode').classList.remove('dark-mode')
      document.querySelector('.App').classList.remove('app-darkmode')
      data = true
    }
  }

 
  return (
    <div className="App">
      <div className='container'>

        
          <button className='light-mode' onClick={darkMode}>
            <div className='circle'></div>
          </button>

        <form className='form-Container' onSubmit={handleSubmit}>
          <p className="text">Nani Up</p>
          <input className='input' type='text' placeholder='Display Name...'/>
          <input className='input nani' type='email' placeholder = 'Enter your Email...'/>
          <input className='input nani2' type='password' placeholder = 'Enter your Password...'/>


          <div className='file-panel'>
            <input style={{display:'none'}} type='file' id='file'/>
            <label htmlFor='file' className='chose-file-button'>
                <img
                  src={add}
                  width={'30px'}
                  height={'30px'}
                  className='Adder-photo'
                  alt='adder'
                />
                Chose your Avatar
            </label>
            <span>{firstTwoDigits}% is uploaded</span>
          </div>

          <button className='sign-up-button'>Sign up</button>
          <p className='text1'>You do have an account?
            <Link to ='/chat'>Log in</Link>
          </p>
          {err && <span>Something went wrong</span>}
        </form>
      </div>
    </div>
  );
}


export default SignUp;
