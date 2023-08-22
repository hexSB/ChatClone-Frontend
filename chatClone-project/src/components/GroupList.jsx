
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import Chat from './Chat';


const GroupList = ({setSelectedId}) => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0();
    const [groups, setGroups] = useState([]);
    const [selectedgroupid, setselectedgroupid] = useState("")
    const [User, setUserid] = useState("")
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([]);




    const joinRoom = async (user, groupId) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:44306/Chat")
                .configureLogging(LogLevel.Information)
                .build();
    
                connection.on("ReceiveMessage", (User, message) => {
                    setMessages(messages => [...messages, { user: User, message }]);
                });
                
    
            await connection.start();
            await connection.invoke("JoinRoom", { user: JSON.stringify(user), groupId });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    };
    
    

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
                setUserid(user.name)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    
    const handleGroupSelect = (groupId) =>{
        setselectedgroupid(groupId)
        setSelectedId(groupId)
        joinRoom(user.name,groupId)


    }

    const arrayData = groups.map((group) => <button key = {group.id} onClick={() => handleGroupSelect(group.id)} className=' hover:bg-gray-600 p-7 border-y-2 flex items-center space-x-20 divide-gray-200 dark:divide-gray-700'>
        <p >{group.groupName}</p>
        <p className="">Member id: {group.membersId}</p>
        </button>);


    const sendMessage = async (message) => {
        try{
            await connection.invoke("SendMessage", message);

        } catch(e){
            console.log(e);
        }
    }

    return(
        <div>
        <div className='fixed top-0 left-0 h-screen w-1/4 m-0 flex flex-col bg-gray-800 text-white py-32 z-0  shadow-lg rounded-lg overflow-hidden'>           
            {arrayData}
            <div className='text-white'>
                {selectedgroupid && <p>Selected Group ID: {selectedgroupid}</p>}
                {User}
            </div>
        </div>
        <div>
            {!connection 
            ? <div>Select a chat</div>
            : <Chat messages={messages} sendMessage = {sendMessage}/>}
            

        </div>
        </div>)
  
};

export default GroupList;