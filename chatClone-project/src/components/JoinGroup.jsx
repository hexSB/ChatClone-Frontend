
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
import axios from 'axios';


const JoinGroup = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [groupId, setGroupId] = useState("")

    async function joinGroupApi() {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`https://localhost:44306/api/Group/join/${groupId}`, {
        headers:{
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data,token)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setGroupId("")

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
                    <button type="submit" onClick={joinGroupApi} className='bg-green-700 rounded-full'>Join Group</button>
                </form>

            </div>
        </div>)
  
};

export default JoinGroup;