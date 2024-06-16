import React, { useContext, useState } from 'react'
import './SignIn.css'
import img_logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import {LoginContext} from '../context/LoginContext';
const SignIn = () => {
  const {setUserLogin}=useContext(LoginContext)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  function handle_Email_change(e){
setEmail(e.target.value)
  }
  function handle_password_Change(e){
    setPassword(e.target.value)
  }
  const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  function handle_Submit_data(){
    if(!emailRegex.test(email)){
      notifyA("Invalid Email")
      return
    }
    else if(!passwordRegex.test(password)){
      notifyA("Invalid Password")
      return
    }
    fetch("http://localhost:5001/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
      email:email,
      password:password
    })}).then((res)=>res.json())
    .then(data=>{
      if(data.error){
        notifyA(data.error)
      }
      else{
        notifyB("Sign in Successfull")
        setUserLogin(true)
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user))
        navigate('/')
      }
    })
  }
  function notifyA(msg){
    toast.error(msg)
  }
  function notifyB(msg){
    toast.success(msg)
  }
  return (
    <div className='signin'>
      <div className='sign-container'>
        <div className='loginForm'>
          <img className='signUpLogo' src={img_logo} alt='logo' />
          <div>
            <input className='input' type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e)=>handle_Email_change(e)} />
          </div>
          <div>
            <input className='input' type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e)=>handle_password_Change(e)} />
          </div>
          <input className='input' type='submit' id='login-btn' value="Sign In" onClick={handle_Submit_data}/>
        </div>
        <div className='loginForm2'>
          Dont Have An account?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default SignIn