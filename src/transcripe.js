import React ,{useState,useRef} from 'react';
import axios from 'axios';
import  '@fortawesome/fontawesome-free/css/all.min.css';



export const Transcrib=()=>{
  const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const mediaRecorderRef = useRef(null);
  
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

  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState('');

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await axios.post('https://speechtranscript.onrender.com/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscript(response.data.transcript);
      console.log(transcript);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };






return (
  <div class="w-full ">
<div class="bg-gray-100 bg-gradient">
<div class="container mx-auto p-4">
    
    <div class="text-center mb-8">
      <center><h1 class="log"></h1></center>
      <h1 class="text-3xl font-bold mt-4">Speech-to-Text Transcription</h1>
    </div>


    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">
      <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
      <i className={isRecording ? 'fas fa-stop-circle' : 'fas fa-microphone'}></i>
    </button>
      {audioURL && (
        <audio controls src={audioURL}></audio>
      )}
      <h1> Record your audio and download then upload for transcription</h1>
    </div>
      </h2>
      
    </div>


    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">Import Audio Files</h2>
      <input type="file" id="audioFile" accept="audio/*" onChange={handleFileChange} class="block w-full text-lg text-gray-700 border border-gray-300 rounded-md p-2"/>
      <button id="uploadBtn" onClick={handleUpload} class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Upload</button>
    </div>


    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Transcribed Text</h2>
      <div id="transcribedText" class="border border-gray-300 p-4 rounded-md h-64 overflow-y-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-lg font-medium shadow-lg">
      {transcript && (
        
<div>
          
          <p>{transcript}</p>
        </div>
      )}
      
    
  </div>
</div></div></div></div>






)   ;




};