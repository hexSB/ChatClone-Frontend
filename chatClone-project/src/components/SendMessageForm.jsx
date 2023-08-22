import React, { useState } from 'react';

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className='flex h-screen'>
    <div className="m-auto">
      Testeses
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit" disabled={!message}>
        Send
      </button>
    </form>
    </div>
    </div>
  );
};

export default SendMessageForm;
