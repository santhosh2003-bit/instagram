import React, { useEffect, useState } from 'react'
import './Profile.css'
import ProfilePost from './ProfilePost/ProfilePost'
import ProfileChange from './ProfileChange'

const Profile = () => {
  const picLink="https://cdn-icons-png.flaticon.com/128/149/149071.png"
const [show, setShow] = useState(false)
const [posts, setPosts] = useState([])
  const [pic, setPic] = useState([])
  const [user, setUser] = useState([])
  const [change, setChange] = useState(false)
  // useEffect(() => {
  //   fetch("http://localhost:5001/myposts", { headers: { "Authorization": "Bearer " + localStorage.getItem('jwt') } }).then((res) => res.json())
  //     .then((data) => setPic(data))
  //     .catch((err) => console.log(err))
  // }, [])


  useEffect(() => {
    fetch(`http://localhost:5001/profile/${JSON.parse(localStorage.getItem('user'))._id}`, { headers: { "Authorization": "Bearer " + localStorage.getItem('jwt') } }).then((res) => res.json())
      .then((data) => {
        setPic(data.post)
        setUser(data.user)
      })
      .catch((err) => console.log(err))
  }, [])


// console.log(user)

const togglePost=(post)=>{
if(show){
  setShow(false)
}
else{
  setShow(true);
  setPosts(post)
}
}


function changeProfile(){
  if(change){
    setChange(false)
  }
  else{
    setChange(true)
  }
}



  return (
    <div className='profile'>
      {/* profile frame */}
      <div className='profile-frame'>
        {/* profile picture */}
        <div className='profile-pic'>
          <img onClick={changeProfile} src={user.photo ? user.photo :picLink} alt='logo' />
        </div>
        {/* profile content */}
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem('user')).name}</h1>
          <div className='profile-info' style={{ display: "flex" }}>
            <p>{pic ? pic.length:"0"} posts</p>
            <p>{user.followers ? user.followers.length:"0"} followes</p>
            <p>{user.following ? user.following.length:"0"} following</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />
      {/* Image galary */}
      <div className='gallary'>
        {
          pic.map((pics,index) => {
            return (
              <img key={index} src={pics.photo} alt='logo' onClick={()=>togglePost(pics)}/>

            )
          })
        }
      </div>
      {
        show &&
      <ProfilePost item={posts} togglePost={togglePost}/>
      }
      {
change && <ProfileChange changeProfile={changeProfile}/>
      }
    </div>
  )
}

export default Profile