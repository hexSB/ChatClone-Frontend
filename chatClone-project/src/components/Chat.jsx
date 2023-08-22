
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr'
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';


const Chat = ({messages, sendMessage}) => {



    return(
        <div>
            <div>
                <MessageContainer messages={messages}/>
                <SendMessageForm sendMessage={sendMessage}/>

            </div>
        </div>)
  
};

export default Chat;