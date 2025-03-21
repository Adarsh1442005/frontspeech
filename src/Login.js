import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [formdata, setformdata] = useState({
    email: '',
    password: ''
  });

  const [responsedata, setresponsedata] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const fieldMapping = {
    email: "email",
    password: "password"
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    const mappedName = fieldMapping[name];
    setformdata((prevdata) => ({
      ...prevdata,
      [mappedName]: value
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    axios.post('https://speechtranscript.onrender.com/login', formdata).then((response) => {
      console.log("Data submitted", response.data);
      setresponsedata(response.data);
      setLoading(false); // Stop loading
      if (response.data.token === 234) {
        Cookies.set('token', response.data.username, { expires: 7 });
        console.log(Cookies.get('token'));
      }
    }).catch((error) => {
      console.error("Error occurred", error);
      setLoading(false); // Stop loading
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center change">
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handlesubmit} method="POST">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              onChange={handlechange}
              required 
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg input-focus" 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              onChange={handlechange}
              required 
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg input-focus" 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg btn-hover">Sign In</button>
          <p className="mt-4 text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-pink-500 hover:underline">Sign Up</Link></p>
        </form>
        {loading && (
          <div className="text-center mt-4">
            <div className="loader border-t-4 border-pink-500 border-solid w-6 h-6 rounded-full animate-spin"></div>
          </div>
        )}
        {responsedata && !loading && (
          <div className="response-data">
            {responsedata.token === 0 ? (
              <p className="text-red-500">Given username or password does not exist</p>
            ) : (
              <p className="text-green-500">You have logged in successfully</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
