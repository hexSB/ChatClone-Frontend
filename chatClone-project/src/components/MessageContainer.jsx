import React, { useEffect, useState, useRef } from 'react';


const MessageContainer = ({ messages }) => {
  const [showGoToTopButton, setShowGoToTopButton] = useState(false);

  // Scrolls down when a new group is created
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "auto" });
  };
  const ref = useRef(null);

  //Scrolls to the top button
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    // Check if the user has scrolled down a certain amount
    if (window.scrollY > 850) {
      setShowGoToTopButton(true);
    } else {
      setShowGoToTopButton(false);
    }
  };

  useEffect(() => {
    try {
      scrollToBottom();
    } catch (e) {
      console.log("No text.");
    }

    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [messages]);

  return (
    <div className=''>
      {showGoToTopButton && (
        <button onClick={scrollToTop} className='fixed bottom-20 right-32 h-8 w-8 z-50 p-0'>
          <div className='font-bold text-2xl'>
          ↑
          </div>
        </button>
      )}
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
