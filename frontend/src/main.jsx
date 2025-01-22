import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import App from './App.jsx'
import storage from './assets/storage.json'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={storage.REACT_APP_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
