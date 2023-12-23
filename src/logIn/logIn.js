import './App.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase'
import { signInWithEmailAndPassword }  from "firebase/auth";

function Login() {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (event)=> {
    event.preventDefault();
    const email = event.target[0].value
    const passWord = event.target[1].value
    try{
      await signInWithEmailAndPassword(auth, email, passWord)
      navigate('/ ')
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
          <input className='input' type='email' placeholder = 'Enter your Email...'/>
          <input className='input' type='password' placeholder = 'Enter your Password...'/>

          <button className='sign-up-button'>Log In</button>
          <p className='text1'>Don't have an account? <Link to = '/SignUp'>
          Sing Up</Link></p>
          {err && <p>invalid login credentials</p>}
        </form>
      </div>
    </div>
  );
}



export default Login