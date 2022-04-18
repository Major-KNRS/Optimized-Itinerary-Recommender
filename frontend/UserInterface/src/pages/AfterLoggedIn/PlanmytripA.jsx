import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from '../Login/Login';
import useToken from '../../useToken';
import Planmytrip from '../Test1';

function PlanmytripA() {
    const { token, setToken } = useToken();
  
    if(!token) {
      return <Login setToken={setToken} />
    }
    const theme = createTheme();


  return (
    <Planmytrip/>

  );
}

export default PlanmytripA;
