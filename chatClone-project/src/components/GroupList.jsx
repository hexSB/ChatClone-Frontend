
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import Chat from './Chat';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';

const GroupList = ({sendGroupId}) => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [groups, setGroups] = useState([])
    const [selectedgroupid, setselectedgroupid] = useState("")
    const [User, setUserid] = useState("")
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])
    const [prevGroupId, setprevGroupId] = useState("")
    const [groupTitle, setGroupTitle] = useState("")
    const [addedGroup, setAddedGroup] = useState("")
    const [token, settoken] = useState("")
    const Chat_URL = import.meta.env.VITE_API_CHAT_URL
    const Joined_URL = import.meta.env.VITE_API_JOINED_URL
    const Message_URL = import.meta.env.VITE_API_Message_URL

    const [conversation, setConversation] = useState("")




    //Connect to server socket group by groupId 
    const joinRoom = async (user, groupId) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(Chat_URL)
                .configureLogging(LogLevel.Information)
                .build();
    
            connection.on("ReceiveMessage", (sender, chatMessage) => {
                getMessagesbyGroupId(groupId);
                console.log(messages)
            });
    
            connection.onclose(e => {
                setConnection()
            })
    
            await connection.start();
            await connection.invoke("JoinRoom", { user: JSON.stringify(user), groupId });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    };


    //Disconnect from the web socket
    const disconnect = async () => {
        try{
            await connection.stop();

        }catch(e) {
            console.log(e);
        }
    }
    
    
    //Get request to get all the joined groups
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get(Joined_URL, {
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
    }, [addedGroup])


    //Scrolls down when a new group a created
    const grouplistEndRef = useRef(null);
    const scrollToBottom = () => {
        console.log("Scrolling to bottom");
        grouplistEndRef.current.scrollIntoView({ behavior: "smooth" });
      };
      const isMounted = useRef(false);

    //Once the new group is created the addedGroup dependancy changes and runs the scroll function
    useEffect(() => {
            try {
                
                if (isMounted.current) {
                    scrollToBottom()
                } else {
                    // Component is mounting, set isMounted to true
                    isMounted.current = true}

            } catch (error) {
                console.error(error);
            }
        }, [addedGroup])
      




    //Handles the group selection onclick  
    const handleGroupSelect = (groupId, groupName) =>{

        if (prevGroupId != groupId){
            setselectedgroupid(groupId)
            joinRoom(user.name,groupId)
            setprevGroupId(groupId)
            getMessagesbyGroupId(groupId)
            setGroupTitle(groupName)
            sendGroupId(groupId)
            disconnect()
        }

    }

    const messagesTest = async () => {
        const lastFiveMessages = messages.slice(-5).map(message => ({
            user: message.user,
            message: message.message
        }));
        const map = {};
        let count = 1;
        let result = '';
    
        lastFiveMessages.forEach(message => {
            if (!map[message.user]) {
                map[message.user] = `user${count}`;
                count++;
            }
            message.user = map[message.user];
            result += `${message.user}: ${message.message} / `;
        });

        result = result.slice(0, -3);
    
        console.log(`{${result}}`);
        setConversation(`{${result}}`);
    }

    const apiTest = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/test`, {
            });
            console.log(response.data)
        } catch(e){
            console.log(e)
            console.log("Error getting messages")
        }
    }
    const SentimentApiTest = async (conversation) => {
        const lastFiveMessages = messages.slice(-5).map(message => ({
            user: message.user,
            message: message.message
        }));
        const map = {};
        let count = 1;
        let result = '';
    
        lastFiveMessages.forEach(message => {
            if (!map[message.user]) {
                map[message.user] = `user${count}`;
                count++;
            }
            message.user = map[message.user];
            result += `${message.user}: ${message.message} / `;
        });
    
        result = result.slice(0, -3);
    
        try {
            console.log(`Sent request`)
            const response = await axios.post(`http://127.0.0.1:8000/sentiment`, {
                text: `{${result}}`
            });
            const responseData = response.data;
            const match = responseData.match(/### Response:\s*(.*?)\s*<\|end_of_text\|>/);
            const sentiment = match ? match[1].trim() : 'unknown';
            console.log(sentiment);
        } catch(e){
            console.log(e)
            console.log(`{${result}}`)
        }
    }

    


    //Sends the message to the websocket and store it to db
    const sendMessage = async (message, selectedgroupid, User) => {
        try{

            //Sends a post request to a create message api
            const token = await getAccessTokenSilently();
            const data = {
                "groupId": selectedgroupid,
                "user": User,
                "message": message,
                "timestamp": ""
            }
            const response = await axios.post(Message_URL, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(message,selectedgroupid, User)

            await connection.invoke("SendMessage", message);


        } catch(e){
            console.log(e);
        }
    }

    //Gets the messages with a api request to the backend and setmessages
    const getMessagesbyGroupId = async (groupId) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${Message_URL}/id/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(response.data)
        } catch(e){
            console.log(e)
            console.log("Error getting messages")
        }
    }

        //Maps the groups list and displays them
    const grouplist = groups.map((group) => <button key = {group.id} onClick={() => handleGroupSelect(group.id, group.groupName)} className=' hover:bg-gray-600 p-7 border-y-2 flex items-center space-x-20 divide-gray-200 dark:divide-gray-700'>
        <p >{group.groupName}</p>
        <p >Group id: {group.id}</p>
        </button>);

    //Update group list after creating a new group by using a callback function to update the value in GroupList
    const updateGroups = (newgroup) => {
        setAddedGroup(newgroup)
      }


    



    return(
        
<div className='flex '>
  <div className='fixed top-0 left-0 h-screen w-1/3 m-0 flex flex-col bg-gray-800 text-white py-32 z-0  shadow-lg rounded-lg overflow-auto'> 
    <CreateGroup updateGroups={updateGroups}/>
    <JoinGroup updateGroups={updateGroups}/>        
    {grouplist}
    

    <div className='text-white'>
      {selectedgroupid && <p>Selected Group ID: {selectedgroupid}</p>}
      {User}
    </div>

    <button onClick={messagesTest}>Test</button>
    <button onClick={apiTest}>Test API</button>
    <button onClick={SentimentApiTest}>Sentiment API</button>

    <div ref={grouplistEndRef}></div>
  </div>

  <div className='flex-1 ml-1 w-2/3'>
    <div className='font-extrabold text-gray-900 dark:text-white md:text-5xl '>
      {groupTitle}
    </div>
    <div className=''>
    {connection && <Chat messages={messages} sendMessage={sendMessage} disconnect={disconnect} selectedgroupid={selectedgroupid} User={User} />}
    </div>
  </div>
</div>
)
  
};

export default GroupList;