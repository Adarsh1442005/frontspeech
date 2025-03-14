import React from 'react';
import './index.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div class="flex items-center justify-center h-screen">
    <div class="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg text-center max-w-sm w-full">
        <div class="absolute top-4 right-6 space-x-4">
            
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Welcome to the Speech Transcription App</h1>
        <p class="text-gray-600 mb-8">Transcribe your speech into text effortlessly.</p>
        <button class="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-purple-500 transition duration-300"><Link to="/transcribe">Get Started</Link></button>
    </div>
    
    </div>);
};

export default Home;
