import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const navigate = useNavigate(); // React Router hook for navigation

  const handleGetStarted = () => {
    setLoading(true); // Show spinner
    setTimeout(() => {
      navigate('/transcribe'); // Navigate to the target page
    }, 1500); // Simulated delay (1.5 seconds) to show the spinner
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to the Speech Transcription App
        </h1>
        <p className="text-gray-600 mb-8">
          Transcribe your speech into text effortlessly.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-purple-500 transition duration-300"
        >
          Get Started
        </button>
        {loading && (
          <div className="mt-4">
            <div className="loader border-t-4 border-blue-500 border-solid w-6 h-6 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
