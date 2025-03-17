import React, { useState, useRef } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Transcrib = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false); // For spinner during transcription
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState('');

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    let chunks = [];
    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      chunks = [];
      setAudioURL(URL.createObjectURL(blob));
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);

    setLoading(true); // Start spinner
    try {
      const response = await axios.post('https://speechtranscript.onrender.com/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscript(response.data.transcript);
      console.log(response.data.transcript);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gray-100 bg-gradient">
        <div className="container mx-auto p-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mt-4">Speech-to-Text Transcription</h1>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Record Audio</h2>
            <div>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="p-4 rounded-full text-white bg-blue-500 hover:bg-blue-700 focus:outline-none transition duration-300"
              >
                <i className={isRecording ? 'fas fa-stop-circle' : 'fas fa-microphone'}></i>
              </button>
              {isRecording && <div className="blinking-wave mt-2"></div>}
              {audioURL && <audio controls src={audioURL}></audio>}
              <p>Record your audio, download it, then upload for transcription.</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Import Audio Files</h2>
            <input
              type="file"
              id="audioFile"
              accept="audio/*"
              onChange={handleFileChange}
              className="block w-full text-lg text-gray-700 border border-gray-300 rounded-md p-2"
            />
            <button
              id="uploadBtn"
              onClick={handleUpload}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Upload
            </button>
            {loading && <div className="loader mt-4"></div>}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Transcribed Text</h2>
            <div
              id="transcribedText"
              className="border border-gray-300 p-4 rounded-md h-64 overflow-y-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-lg font-medium shadow-lg"
            >
              {transcript && <p>{transcript}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
