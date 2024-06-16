import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import ProfilePost from './ProfilePost/ProfilePost'
import { useParams } from 'react-router-dom'
const UserProfile = () => {
  const picLink ="https://cdn-icons-png.flaticon.com/128/149/149071.png"
  const [isFollow, setIsFollow] = useState(false)
    const {userid}=useParams()
    // console.log(userid)
// const [show, setShow] = useState(false)
const [user, setUser] = useState([])
  const [post, setPost] = useState([])
  useEffect(() => {
    fetch(`http://localhost:5001/profile/${userid}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('jwt') } }).then((res) => res.json())
      .then((data) =>{
        console.log(data)
        setUser(data.user)
        setPost(data.post)
        if(data.user.followers.includes(JSON.parse(localStorage.getItem('user'))._id)){
setIsFollow(true)
        }
      })
     
      .catch((err) => console.log(err))
  }, [isFollow])

const followuser=(userId)=>{
  fetch('http://localhost:5001/follow',{method:"put",headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer " +localStorage.getItem('jwt')
  },
body:JSON.stringify({
  followId:userId
})}).then((res)=>res.json())
.then((result)=>{
  console.log(result)
  setIsFollow(true)
})
}

const unfollow=(userId)=>{
  fetch("http://localhost:5001/unfollow",{method:"put",headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem('jwt')
  },body:JSON.stringify({
    followId:userId
  })}).then((res)=>res.json())
  .then((data)=>console.log(data))
setIsFollow(false)
}




// const togglePost=(post)=>{
// if(show){
//   setShow(false)
// }
// else{
//   setShow(true);
//   setPosts(post)
// }
// }


  return (
    <div className='profile'>
      {/* profile frame */}
      <div className='profile-frame'>
        {/* profile picture */}
        <div className='profile-pic'>
          <img src={user.photo ? user.photo : picLink} alt='logo' />
        </div>
        {/* profile content */}
        <div className='profile-data'>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

          <h1>{user.name}</h1>
        
         <button className='followBtn' onClick={()=>{
          if(isFollow){
            unfollow(user._id)
          }
          else{
            followuser(user._id)
          }
         }}>{isFollow?"Unfollow":"Follow"}</button>
          </div>
          <div className='profile-info' style={{ display: "flex" }}>
            <p>{post.length} posts</p>
            <p>{user.followers?user.followers.length:"0"} followes</p>
            <p>{user.following?user.following.length:"0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />
      {/* Image galary */}
      <div className='gallary'>
        {
          post.map((pics,index) => {
            return (
              <img key={index} src={pics.photo} alt='logo' 
            //   onClick={()=>togglePost(pics)}
              />

            )
          })
        }
      </div>
      {/* {
        show &&
      <ProfilePost item={posts} togglePost={togglePost}/>
      } */}
    </div>
  )
}

export default UserProfile