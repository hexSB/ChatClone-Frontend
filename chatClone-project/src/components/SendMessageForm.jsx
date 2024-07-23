import React, { useState } from 'react';

const SendMessageForm = ({ sendMessage, selectedgroupid, User}) => {
  const [message, setMessage] = useState('');




  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message, selectedgroupid, User);
    setMessage('')
  };

  return (
    <div className='fixed inset-y-0 right-0 text-justify divide-y w-2/3 mt-10'>
    <div className="absolute bottom-0 inset-x-0 ">

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className='w-11/12 h-12'
      />
      <button type="submit" disabled={!message} class = "fixed">
        Send
      </button>
    </form>
    </div>
    </div>
  );
};

export default SendMessageForm;
