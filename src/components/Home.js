import React from 'react'
import './Home.css'
import Sidebar from './sidebar'
import Chat from './chat'


function Home() {
  
  let data = true


  function darkMode() {
  
    if (data === true){
      document.querySelector('.circle').classList.add('circle-darkmode')
      document.querySelector('.light-mode').classList.add('dark-mode')
      document.querySelector('.Home').classList.add('AApp-darkmode')
      document.querySelector('.messages').classList.add('messages2')
      data = false
    }else{
      document.querySelector('.circle').classList.remove('circle-darkmode')
      document.querySelector('.light-mode').classList.remove('dark-mode')
      document.querySelector('.Home').classList.remove('AApp-darkmode')
      document.querySelector('.messages').classList.remove('messages2')
      data = true
    }
  }


  return (
    <div className='Home'>
          <button className='light-mode' onClick={darkMode}>
            <div className='circle'></div>
          </button>
      <div className='container-1'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home