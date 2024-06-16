import React, { useState } from 'react'
import img_logo from '../images/logo.png'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const SignUp = () => {
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

//handle the name Chaneges
function handle_Email_Change(e){
    setEmail(e.target.value)
}
//handle name change
function handle_Name_Change(e){
    setName(e.target.value)
}
//handle userName changes
function handle_UserName_Change(e){
    setUserName(e.target.value)
}
//handle password changes
function handle_Password_Change(e){
    setPassword(e.target.value)
}
const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
function handle_Submit_data(){
    if(!emailRegex.test(email)){
        notifyA("Email Not Valid")
        return
    }
    else if(!passwordRegex.test(password)){
        notifyA("Password must 8 Characters and some Special characters")
        return
    }
    fetch("http://localhost:5001/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:name,
        userName:userName,
        email:email,
        password:password
    })
    //first convert into json formate
}).then((res)=>res.json())//resonse will return promises
//print it message
.then(data=>{
    if(data.error){
        notifyA(data.error)
    }
   else{
    notifyB(data.message)
    navigate("/signin")
   }
    })
}

const notifyA=(msg)=>{
toast.error(msg)
}
const notifyB=(msg)=>{
    toast.success(msg);
  
    }
    return (
        <div className='signup'>
            <div className='form-container'>
                <div className='form'>
                    <img className='signUpLogo' src={img_logo} alt='Image Not Available' />
                    <p className='loginPara'>
                        Sign up to see photos and videos <br /> from your friends
                    </p>
                    <div>
                        <input className='input' type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e)=>handle_Email_Change(e)}/>
                    </div>
                    <div>
                        <input className='input' type='text' name='name' id='name' placeholder='Full Name' value={name} onChange={(e)=>handle_Name_Change(e)} />
                    </div>
                    <div>
                        <input className='input' type='text' name='username' id='username' placeholder='UserName' value={userName} onChange={(e)=>handle_UserName_Change(e)} />
                    </div>
                    <div>
                        <input className='input' type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e)=>handle_Password_Change(e)}/>
                    </div>
                    <p className='loginPara' style={{ fontSize: "12px", margin: "3px 0px" }}>
                        By signing up, you agree to out Terms , <br /> privacy policy and cookies policy
                    </p>
                    <input className='input' type='submit' id='submit-btn' value="Sign Up" onClick={handle_Submit_data}/>

                </div>
                <div className='form2'>
                    Already have an account ?<Link to="/signin">
                        <span style={{ color: 'blue', cursor: "pointer" }}>Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;