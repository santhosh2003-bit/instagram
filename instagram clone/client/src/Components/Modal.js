import React, { useContext } from 'react'
import './Modal.css'
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import LoginContext from '../context/LoginContext';
const Modal = ({setModelOpen}) => {
    const {setUserLogin}=useContext(LoginContext)
    const navigate=useNavigate()
    const logOutConcept=()=>{
       // localStorage.removeItem('jwt')  this is also work 
localStorage.clear()
setUserLogin(false)
navigate('/signin')
    }
    return (
        <div className='darkBg' onClick={()=>setModelOpen(false)}>

            <div className='centered'>

                <div className='modal'>
                    {/* modal header */}
                    <div className='modalHeader'>
                        <h5>Confirm</h5>
                        <button className='closeBtn'>
                            <RiCloseFill onClick={()=>setModelOpen(false)}></RiCloseFill>
                        </button>
                    </div>
                    {/* Modal ontent */}
                    <div className='modalContent'>
                        Are You really want to log Out ?
                    </div>
                    <div className='modalActions'>
                        <div className='actionsContainer'>
                            <button className='logOutBtn'onClick={()=>logOutConcept()}>Log Out</button>
                            <button className='cancelBtn' onClick={()=>setModelOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal