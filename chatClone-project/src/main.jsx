import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Auth0Provider} from '@auth0/auth0-react'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Auth0Provider 
    domain="hexsp.us.auth0.com"
    clientId="nYjwe3XbJmc4yRfnA1V0bKRyzp0wtwKr"
    authorizationParams={{redirect_uri: window.location.origin, audience: "Chat-Auth", scope: "openid profile email read:messages"}} 
>
      <App />
    </Auth0Provider>

)
