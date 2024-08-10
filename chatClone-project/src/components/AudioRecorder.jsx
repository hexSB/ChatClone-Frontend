import React, { useState, useEffect } from 'react';
import AudioAnalyser from 'react-audio-analyser';

const AudioRecorder = ({ transcriptUpdate }) => {
  const [status, setStatus] = useState('');
  const [audioType, setAudioType] = useState('audio/mp3');
  const [audioSrc, setAudioSrc] = useState(null);
  const [dropdownVisibleMic, setDropdownVisibleMic] = useState(false);

  const toggleDropdownMic = () => {
    setDropdownVisibleMic(!dropdownVisibleMic);
  };

  const toggleRecording = () => {
    setStatus((prevStatus) => (prevStatus === 'recording' ? 'inactive' : 'recording'));
  };

  const changeScheme = (e) => {
    setAudioType(e.target.value);
  };

  useEffect(() => {
    setAudioType('audio/mp3');
  }, []);

  const uploadBlob = async (audioBlob, fileType) => {
    const formData = new FormData();
    const filename = `file_${new Date().getTime()}`;
    formData.append('file', audioBlob, filename);

    const apiUrl = 'http://localhost:8000/receiveAudio';

    const response = await fetch(apiUrl, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
    });

    const jsonResponse = await response.json();
    const transcript = jsonResponse.transcription;
    transcriptUpdate(transcript);

    return jsonResponse;
  };

  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log('succ start', e);
    },
    pauseCallback: (e) => {
      console.log('succ pause', e);
    },
    stopCallback: async (e) => {
      console.log('succ stop', e);
      const response = await uploadBlob(e, audioType);
      console.log(response);
    },
    onRecordCallback: (e) => {
      console.log('recording', e);
    },
    errorCallback: (err) => {
      console.log('error', err);
    },
  };

  return (
    <div className='py-1'>
      <button
        id="dropdownTopButton"
        onMouseDown={() => {
            toggleDropdownMic();
            toggleRecording();
          }}
          onMouseUp={() => {
            toggleRecording();
            toggleDropdownMic();
          }}
        className="me-3 mb-3 md:mb-0 text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-1 py-2 text-center inline-flex items-center dark:focus:ring-red-800"
        type="button"
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9v3a5.006 5.006 0 0 1-5 5h-4a5.006 5.006 0 0 1-5-5V9m7 9v3m-3 0h6M11 3h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"/>
        </svg>
      </button>

      <div id="dropdownTop" className={`absolute bottom-full mb-2 z-10 rounded-lg shadow w-44 ${dropdownVisibleMic ? 'block' : 'hidden'}`}>
        <ul className="py-2 text-sm" aria-labelledby="dropdownTopButton">
          <li>
            <AudioAnalyser {...audioProps} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AudioRecorder;