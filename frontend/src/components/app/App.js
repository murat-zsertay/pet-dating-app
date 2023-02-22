import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import NavBar from '../navBar/navBar';
import React from 'react';
import Feed from '../feed/Feed'
import {Route, Routes, useNavigate,} from "react-router-dom";

const App = () => {
    return (
      <>
        <NavBar/>
        <Routes>
          <Route path='/posts' element={<Feed navigate={useNavigate()} />} />
          <Route path='/login' element={<LoginForm navigate={useNavigate()} />} />
          <Route path='/signup' element={<SignUpForm navigate={useNavigate()} />} />
        </Routes> 
      </>
    );
}


export default App;
