import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home';
import Login from './Login';
import {About} from './About';
import SignUp from './signup';
import {Transcrib} from './transcripe';
import Protect from './protectedrout.js';
import { Logout } from './logout.js';


function App() {
  return (
    
    <Router>
      <div >
        <nav>
          <Link class="text-gray-700 inline-block mr-5" to="/"><span class="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out" >Home</span></Link>
           
          <Link to="/login" class= "text-gray-700 inline-block mr-5"><span class="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out" >Login</span></Link>
          <Link to="/signup"  class= "text-gray-700 inline-block mr-5"><span class="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out" >signup</span></Link>
          <Link to="/logout"><span class="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out" >logout</span></Link>
          
            
          
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/" element={<Protect/>}>
             <Route path="transcribe" element={<Transcrib/>}/>
          
          </Route>
          <Route path="/logout" element={<Logout/>}/> 
          
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
