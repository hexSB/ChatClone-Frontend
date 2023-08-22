import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import GroupList from '../components/GroupList';
import CreateGroup from '../components/CreateGroup';
import Profile from '../components/Profile';
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import Chat from '../components/Chat';
import JoinGroup from '../components/JoinGroup';

const Welcome = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
    const [selectedId, setSelectedId] = useState("")




    async function callUserApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get("https://localhost:44306/api/private", {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,token)
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
      <div className='flex h-screen'>
        <div className="m-auto">
        <Profile/>
        <div >
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            <button onClick={callUserApi}>Get Auth</button>

            <button onClick={GroupGetTest}>Get All Groups</button>
        </div>
        <JoinGroup/>
        <div>
          <GroupList setSelectedId = {setSelectedId}/>
          <h1>Test {selectedId}</h1>
          <div><CreateGroup/></div>
          </div>

        </div>
      </div>
      
        )
  
};

export default Welcome;