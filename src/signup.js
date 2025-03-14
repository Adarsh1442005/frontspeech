import React,{useState} from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const  SignUp=()=> {
    const[formdata,setformdata]=useState({
        username:'',
        email:''  ,
        password:''   
    });
    const [showPassword, setShowPassword] = useState(false);
    const fieldMapping = {
        username: 'username',
        email: 'email',
        password: 'password'
      };

    const[responseData,setresponsedata]=useState(null);

    const handlechange=(e)=>{
        const{name,value}=e.target;
        const mappedName = fieldMapping[name];
        setformdata((prevdata)=>({
            ... prevdata,
            [mappedName]:value
            
        
        
    }));
    
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const handlesubmit=(e)=>{
        
        e.preventDefault();
        axios.post('https://speechtranscript.onrender.com/submit',formdata).then((response)=>{
            console.log("Data submitted",response.data);
            setresponsedata(response.data);
    
        }


        ).catch((error)=>{
            console.error("error is there",error);
        });
    };

  return (
    <div className="min-h-screen flex items-center justify-center change">
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handlesubmit} method="POST">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={formdata.username}
              onChange={handlechange}
              required 
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg input-focus" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formdata.email}
              onChange={handlechange}
              required 
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg input-focus" 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formdata.password}
                onChange={handlechange}
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
              
              
          </div>
          <button type="submit" className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg btn-hover">Sign Up</button>
          <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Log In</Link></p>
        </form>
        {responseData && (
        <div className="response-data">
          {responseData.token===0? (<p class="text-red-500">username already exists</p>):(<p class="text-green-500">your account has been created successfully</p>)}
          
        </div>
      )}
      </div>
      
    </div>
    
  );
};

export default SignUp;
