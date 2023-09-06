
import { useAuth0 } from '@auth0/auth0-react'
import {useState } from 'react';
import axios from 'axios';


const JoinGroup = ({updateGroups}) => {
    const { getAccessTokenSilently } = useAuth0();
    const [groupId, setGroupId] = useState("")
    const JoinGroup_URL = import.meta.env.VITE_API_JoinGroup_URL

    async function joinGroupApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${JoinGroup_URL}/${groupId}`, {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,token)
      updateGroups("Update") //Set to any value to update
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setGroupId("")
        joinGroupApi()
    }

    const handleInputChange = (event) => {
        const value = event.target.value
        setGroupId(value)
    }


    return(
        <div>
            <div>
            <form onSubmit={handleSubmit}>
                Group Id:
                    <label className='px-2'>
                    <input
                        type="text"
                        name="groupId"
                        value={groupId}
                        onChange={handleInputChange}
                    />
                    </label>
                    <button type="submit" className='bg-green-700 rounded-full align-middle'>Join Group
                        <div className='relative inset-0 inline-block align-middle'>
                            <svg class="w-5 h-5 text-gray-800 dark:text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
                                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
                            </svg>
                        </div>
 
                    </button>
                </form>

            </div>
        </div>)
  
};

export default JoinGroup;