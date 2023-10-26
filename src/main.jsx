import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'
import { UserDataProvider } from './contexts/User.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserDataProvider>
  </React.StrictMode>,
)
