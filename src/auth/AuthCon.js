import { createContext, useState , useEffect} from "react";
import {auth} from '../firebase'
import { onAuthStateChanged } from "firebase/auth";


export const authCon = createContext()

const AuthContextProvider = ({ children }) => {
  const [currentUser , setCurrentUser] = useState({})
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user)=> {
      setCurrentUser(user)
    });

    return () => {
      unsubscribe(); 
    };
    
  }, []);

  return(
  <authCon.Provider value = {{currentUser}}>
    {children}
  </authCon.Provider>
  )
};


export {AuthContextProvider}