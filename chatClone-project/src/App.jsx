import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Log from './pages/Main'
import Welcome from './pages/Menu'

function App() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? <Route index element={<Welcome />} /> : <Route index element={<Log />} />}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
