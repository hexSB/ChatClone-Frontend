import React, { useState } from 'react';

const SendMessageForm = ({ sendMessage, selectedgroupid, User, sentiment}) => {
  const [message, setMessage] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message, selectedgroupid, User);
    setMessage('')
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSentiment = async () => {
    if (loading) {
      console.log('Sentiment analysis is already in progress.');
      return;
    }

    setLoading(true);
    try {
      const sentimentVal = await sentiment();

      if (sentimentVal === 'positive') {
        setMessage('😀');
      } else if (sentimentVal === 'negative') {
        setMessage('😢');
      } else {
        setMessage('😐');
      }
    } catch (error) {
      console.error('Error getting sentiment:', error);
      setMessage('Error determining sentiment');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='fixed inset-y-0 right-0 text-justify divide-y w-2/3 mt-10'>
      <div className="absolute bottom-0 inset-x-0 flex pl-4">
        <button
          id="dropdownTopButton"
          onClick={toggleDropdown}
          className="me-3 mb-3 md:mb-0 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center
           dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          type="button"
        >
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
          </svg>
        </button>

        {dropdownVisible && (
          <div id="dropdownTop" className="absolute bottom-full mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownTopButton">
              <li>
                <a onClick={handleSentiment} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Generate Sentiment</a>
              </li>
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-grow">
          <input
            type="text"
            placeholder="     Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className='w-10/12 h-12 rounded-full flex-grow'
          />
          <div className="inline-flex fixed">
            <button type="submit" disabled={!message} className="rounded-full">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessageForm;