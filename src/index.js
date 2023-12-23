import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import { AuthContextProvider }from './auth/AuthCon';
import { ChatContextProvider } from './auth/chatCon';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
       <ChatContextProvider>
        <React.StrictMode>
                <App />
            </React.StrictMode>
       </ChatContextProvider>
    </AuthContextProvider>
);