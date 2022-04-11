import React, { useEffect } from "react";
import Login from "../pages/Login/Login";
import useToken from "./App/useToken";

function Authenticate(){
  
    const { token, setToken } = useToken();
  
    if(!token) {
      return <Login setToken={setToken} />
    }
  }

  export default Authenticate;
