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
    const [newgroups, setNewgroups] = useState([]) 
    const[groupid, setGroupid] = useState()

    const getGroupid = (id) =>{
      setGroupid(id)
    }

    
    return(
      <div >

        <div >
          <div className='font-bold text-lg'>
          Group Id: {groupid}
          </div>


        <div className='fixed top-0 right-0 pr-4'>
          <div className='pt-5'>
          <Profile/>
          </div>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className='bg-red-600 text-white font-extrabold'>
              Log Out
            </button>
        </div>
        <div >
          <GroupList sendGroupId = {getGroupid}/> <JoinGroup/>

          </div>

        </div>
      </div>
      
        )
  
};

export default Welcome;