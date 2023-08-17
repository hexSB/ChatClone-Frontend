
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import { useEffect, useState } from 'react';
const GroupList = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const token = getAccessTokenSilently();

    const [groups, setGroups] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get('https://localhost:44306/api/Group/joined', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setGroups(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])


      const arrayData = groups.map((group) => <h3 key = {group.id} className=' hover:bg-gray-600 p-7 border-y-2 flex items-center space-x-20 divide-gray-200 dark:divide-gray-700'>
        <p >{group.groupName}</p>
        <p className="">Member id: {group.membersId}</p>
        </h3>);

    return(
        <div className='fixed top-0 left-0 h-screen w-1/4 m-0 flex flex-col bg-gray-800 text-white py-32 z-0  shadow-lg rounded-lg overflow-hidden'>           
            {arrayData}
        </div>)
  
};

export default GroupList;