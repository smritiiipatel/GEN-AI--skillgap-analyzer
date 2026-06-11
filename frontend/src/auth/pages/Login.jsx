import React from 'react';
import "../auth.from.scss";
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate , Link} from 'react-router';
import { useState } from 'react';

const Login = () => {

    const {loading ,handleLogin} = useAuth()

    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")

     const navigate = useNavigate()

    const handleSubmit = async (e)=>{
     e.preventDefault()
    await handleLogin({email,password})
    navigate("/homepage")
    }

if(loading){
    return(<main><h1>LOADING.....</h1>
    </main>)
}

  return (
      <main>
        <div className="from-container">
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}}
                    
                    type='email' id='email' name='email' placeholder='Enter your Email'/>       
               </div>
               <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' id='password' name='password' placeholder='Enter your Password'/>  
                    <button className='button primary-button'>LOGIN</button>     
               </div>
            </form>
            <p>Don't have an account?<Link to={"/register"}>Register</Link></p>
        </div>

      </main>
  )
}

export default Login
