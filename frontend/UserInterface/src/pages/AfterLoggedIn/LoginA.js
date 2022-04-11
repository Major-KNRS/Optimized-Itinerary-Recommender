import React from 'react';
// import { useEffect } from 'react';
// import Home from './pages/Home';
import Header from '../../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Planmytrip from './pages/Planmytrip';
import Login from '../Login/Login';
// import Signup from './pages/Signup';
import useToken from '../../components/App/useToken';
import Home from '../Home';


function LoginA() {
    const { token, setToken } = useToken();
  
    if(!token) {
      return <Login setToken={setToken} />
    }
    const theme = createTheme();


  return (
    <Home/>

  );
}

export default LoginA;
