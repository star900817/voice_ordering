import React, { useContext, useState } from 'react';
import './SearchBox.css';
import { ReactComponent as SearchIcon } from '../assets/icons/Frame.svg';
import { ReactComponent as MicOff } from '../assets/icons/mic_off.svg';
import { ReactComponent as MicOn } from '../assets/icons/mic_on.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/ic_baseline-arrow-forward.svg';
import { ProductContext } from '../commons/Home';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const { message, setMessage } = useContext(ProductContext);
  const data = { query };

  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcribedText, setTranscribedText] = useState('');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        setAudioChunks([...audioChunks, e.data]);
      };

      recorder.start();
      setRecording(true);
      setMediaStream(stream);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = async () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    setRecording(false);

    // Convert audio chunks to a single Blob
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

    // Send audio blob to backend

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTranscribedText(data.Result);
    } catch (error) {
      console.error('Error sending audio to backend:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!query.trim() == '') {
      setMessage((message) => [
        ...message,
        { user: 'USER', text: query },
        { user: 'BOT', text: 'LOADING' },
      ]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          body: JSON.stringify(data),
        });

        if (res.ok) {
          setQuery('');
          const response = await res.json();
          // setMessage(response.message)
          setMessage((message) => [
            ...message.filter((item) => item.text !== 'LOADING'),
            { user: 'BOT', text: response.message },
          ]);
        }
      } catch (err) {}
      setMessage((message) =>
        message.filter((item) => item.text !== 'LOADING')
      );
    }
  };

  return (
    <div className="searchbox-wrapper">
      <div className="search-icon">
        <span>
          <SearchIcon />
        </span>
      </div>
      <div className="search-input">
        <input
          value={query}
          placeholder="Search your Products"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="resibar-icon">
        <div>
          {recording ? (
            <span style={{ cursor: 'pointer' }}>
              <MicOn onClick={stopRecording} style={{ marginTop: '5px' }} />
            </span>
          ) : (
            <span style={{ cursor: 'pointer' }}>
              <MicOff onClick={startRecording} />
            </span>
          )}
          {audioChunks.length < 0 && (
            <div>
              <audio controls>
                <source
                  src={URL.createObjectURL(
                    new Blob(audioChunks, { type: 'audio/wav' })
                  )}
                  type="audio/wav"
                />
              </audio>
            </div>
          )}
          {transcribedText && <div>{transcribedText}</div>}
        </div>
      </div>
      <div className="arrow-icon" onClick={handleSendMessage}>
        <span>
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
};

export default SearchBox;
