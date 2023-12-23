import SignUp from './logIn/signUp.js';
import Login from './logIn/logIn.js'
import Home from './components/Home.js'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { authCon } from './auth/AuthCon.js';
import { useContext } from 'react';




function App() {

  const {currentUser} = useContext(authCon)

  const ProtectRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to='/chat'/>
    }else {
      return children
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={
          <ProtectRoute> 
            <Home />
          </ProtectRoute>}/>

          <Route path='chat' element={<Login />}/>
          <Route path = 'SignUp' element={<SignUp />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
