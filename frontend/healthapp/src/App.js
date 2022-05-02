import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Pages/home';
import Devices from './components/Pages/devices';
import Chat from './components/Pages/chat';
import Signup from './components/Pages/signup';
import Signout from './components/Pages/signout';
import FormSignin from './components/Pages/formsignin';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/devices" element={<Devices/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<FormSignin/>}/>
        <Route path="/signout" element={<Signout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
