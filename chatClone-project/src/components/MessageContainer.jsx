import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, useRef, useLayoutEffect , } from 'react';

const MessageContainer = ({ messages, User }) => {
  const { user } = useAuth0();


      //Scrolls down when a new group a created
      const messageEndRef = useRef(null);
      const scrollToBottom = () => {
          console.log("Scrolling to bottom");
          messageEndRef.current.scrollIntoView({ behavior: "auto" });
        };
  
      //Once the new message is created the messages dependancy changes and runs the scroll function
      useEffect(() => {   
            try {
                scrollToBottom()
            } catch (e) {
                console.log("No text");
            }
    }, [messages])
          

  return (
    <div className=''>
      <div className='absolute inset-y-0 right-0 text-justify divide-y w-2/3 mt-64 '>
        {messages && Array.isArray(messages) ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`w-5/6  py-3 text-white pl-3`}
              style={{ wordWrap: 'break-word' }}
            >
              <div className='font-medium'>
                {message.user} - {message.timestamp}
              </div>
              <div className='font-light mb-3 pb-10 pl-5'>{message.message}</div>
              <div ref={messageEndRef}></div>
            </div>
          ))
        ) : (
          <div>No messages to display</div>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;
