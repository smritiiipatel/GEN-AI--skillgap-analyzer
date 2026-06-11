import { useAuth } from "../hooks/useAuth.jsx";
import React from 'react';
import { Navigate } from "react-router";

const Protected = ({children}) => {

    const {loading, user} = useAuth()
    
    if(loading){
        return(<main>LOADING...</main>)
    }
    
    if(!user){
      return <Navigate to={'/login'}/>
    }

  return children
}

export default Protected
