import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useState } from 'react';


const Welcome = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [chat, setChat] = useState([])
    const [tokens, setToken] = useState("")

    function callApi() {
      axios.get("https://localhost:44306/api/Chat").then(response => {console.log(response.data)})
    }

    async function callUserApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/private", {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,token)
    }


    async function callProtectedApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/private-scoped", {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
    }


    
    return(
        <div>
            <h1>Welcome</h1>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            <button onClick={callApi}>Get chat</button>
            <button onClick={callProtectedApi}>Get protected</button>
            <button onClick={callUserApi}>Get Auth</button>

        </div>)
  
};

export default Welcome;