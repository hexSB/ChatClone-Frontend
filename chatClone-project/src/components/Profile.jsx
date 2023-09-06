
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
const Profile = () => {
    const { user } = useAuth0();


    const [groups, setGroups] = useState([]);
    


    return(
        <div className=' '>           
            <h1 className='font-semibold'>User: {user.name}</h1>
        </div>)
  
};

export default Profile;