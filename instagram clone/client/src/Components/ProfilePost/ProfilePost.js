import React, { useState } from 'react'
import './ProfilePost.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ProfilePost = ({item,togglePost}) => {
    const navigate=useNavigate()
    const [comment, setComment] = useState("")
    const removePost=(postId)=>{
        if(window.confirm("Are Use Really Want to Delete This Post")){
            fetch(`http://localhost:5001/delete/${postId}`,{
                method:"delete",
                headers:{"Authorization":"Bearer "+ localStorage.getItem('jwt')}})
            .then((res)=>res.json())
            .then((result)=>{
                togglePost()
                navigate("/")
                if(result.message){
                    notifyB(result.message)
                }
                else{
                    notifyA(result.error)
                }
            })

        }
     
    }
//tostify functions
const notifyA=(msg)=>{
    toast.error(msg)
}
const notifyB=(msg)=>{
toast.success(msg)
}
  return (
    
       <div className="showComment" >
          <div className="close" onClick={()=>togglePost()}>
            <span className="material-symbols-outlined">
              close
            </span>
          </div>
          <div className="container">
            <div className="postPic">
              <img onClick={()=>console.log(item)} src={item.photo } alt="logo" />
            </div>
            <div className="details">
              {/* comment header */}
              <div className='card-header' style={{ borderBottom: "1px solid gray" }}>
                <div className='card-pic'>
                  <img src='https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile' />
                </div>
                <h5>{item.postedBy.name}</h5>
            <div className='deleteIcon' onClick={()=>removePost(item._id)}>
            <span className="material-symbols-outlined">
delete
</span>
            </div>
              </div>
              {/* comment section */}

              <div className="comment-section" style={{ borderBottom: "1px solid gray" }} >
              {
                item.comments.map((v,index)=>{
                  return (
                    <p key={index}>
                    <div className='card-pic'>
                      <img src='https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile' />
                    </div>
                    <span className='commenter' style={{ fontWeight: "bolder" }}>{item.postedBy.name}</span>
                    <span className='textenter' >{v.comment}</span>
                  </p>
                  )
                })
              }

              </div>
              <div className="card-content">
                <span className="material-symbols-outlined" >
                  favorite
                </span>
                <p>{item.likes.length} likes </p>
                <p>{item.body}</p>

              </div>
              {/* Add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input type="text" placeholder='Add Comment.....' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                <button onClick={()=>{
                //   makeComment(item._id,comment)
                //   toggleshow()
                  }}>post</button>
              </div>

            </div>
          </div>


        </div>
  )
}

export default ProfilePost