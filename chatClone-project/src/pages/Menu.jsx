import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useState } from 'react';
import GroupList from '../components/GroupList';
import CreateGroup from '../components/CreateGroup';
import Profile from '../components/Profile';

const Welcome = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();



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


    async function GroupGetTest() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/Group", {
        headers:{
          authorization: `Bearer ${token}`,
          
        }
      })
      console.log(response.data)
    }



    
    return(
      <div className='absolute inset-12 '>
        <Profile/>
        <div >
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            <button onClick={callApi} >Get chat</button>
            <button onClick={callProtectedApi}>Get protected</button>
            <button onClick={callUserApi}>Get Auth</button>

            <button onClick={GroupGetTest}>Get All Groups</button>
            <CreateGroup/>
        </div>
        <GroupList/>
      </div>
      
        )
  
};

export default Welcome;