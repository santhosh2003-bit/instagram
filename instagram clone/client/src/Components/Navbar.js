import React, { useContext } from 'react'
import './Navbar.css'
import insta_logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import LoginContext from '../context/LoginContext'
const Navbar = ({ login }) => {

  const navigate=useNavigate();

const {setModelOpen}=useContext(LoginContext)
  const loginsign = () => {
    const token = localStorage.getItem('jwt')
    
    if (login || token) {
      return (
        <>
          <Link to='/profile'>
            <li>Profile</li>
          </Link>
          <Link to='/createpost'>
            <li>Create Post</li>
          </Link>
        <Link to='/myfollowpost'>
        <li style={{marginLeft:"20px"}}>myfollower post</li>
        </Link>
          <Link to=''>
            <li style={{ backgroundColor: "red", padding: "5px", borderRadius: "5px", color: "white", fontWeight: "bold" }} onClick={()=>setModelOpen(true)}>LogOut</li>
          </Link>

        </>
      )
    }
    else {
      return (
        <>
          <Link to='/signup'>
            <li>SignUp</li>
          </Link>
          <Link to='/signin'>
            <li>SignIn</li>
          </Link>
        </>
      )
    }
  }



  return (
    <div className='navbar'>
      
      <img onClick={()=>{
        navigate("/")
      }} src={insta_logo} alt='logo' />
      
      <ul className='nav-menu'>
        {loginsign()}
      </ul>
    </div>
  )
}

export default Navbar