
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';


const Chat = ({messages, sendMessage, disconnect, selectedgroupid, User}) => {
    return(
        <div>
            <div>
            <div className=' '>
                <MessageContainer messages={messages} User={User}/>
                </div>
                <div className=''>
                <SendMessageForm sendMessage={sendMessage} selectedgroupid={selectedgroupid} User={User}/>
                </div>

            </div>
        </div>)
  
};

export default Chat;