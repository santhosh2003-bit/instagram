import React, { useEffect, useRef, useState } from 'react'
// import './Profile.css'
const ProfileChange = ({ changeProfile }) => {
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")



    // posting images to cloudinary

    function postShare() {
        // console.log(body,image)
        const data = new FormData();
        data.append("file", image)
        //mention which application to upload
        data.append("upload_preset", "insta-clone");
        //mention cloud names and details
        data.append("cloud_name", "santhoshcloud")
        fetch("https://api.cloudinary.com/v1_1/santhoshcloud/image/upload", { method: "post", body: data }).then((res) => res.json())
            .then((data) => setUrl(data.url))

            .catch((err) => console.log(err))

    }


    const postPic=()=>{
       

            fetch("http://localhost:5001/uploadprofile",{method:"put",headers:{"Content-Type":"application/json","Authorization":"Bearer "+ localStorage.getItem('jwt')},body:JSON.stringify({pic:url})})
            .then((res)=>res.json())
            .then((data)=>{
              //in this data we have an object that if you provide correct creadentials then its provide success image url and image details other wise it produce data.error message we provide in createpost.js in backend file
             console.log(data)
             changeProfile()
             window.location.reload()
            })
            .catch((err)=>console.log(err))
        }
    





    const handleClick = () => {
        hiddenFileInput.current.click();
    }

useEffect(()=>{
    if(image){
        postShare()
    }

},[image])


useEffect(()=>{
    if(url){
        postPic()
    }
},[url])



    return (
        <div className='profilePic darkBg'>
            <div className='changePic centered'>
                <div>
                    <h1>
                        Change Profile Photo
                    </h1>
                </div>
                <div style={{ borderTop: "1px solid gray" }}>
                    <button className='upload-btn' style={{ color: "#198BCF" }} onClick={handleClick}>Upload Photo</button>
                    <input type='file' ref={hiddenFileInput} accept='image/*' style={{ display: "none" }} onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div style={{ borderTop: "1px solid gray" }}>
                    <button className='upload-btn' style={{ color: "#ED4956" }} onClick={()=>{
                        setUrl(null)
                        postPic()
                    }}>Remove Current Photo</button>
                </div>
                <div style={{ borderTop: "1px solid gray" }}>
                    <button onClick={changeProfile} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}>cancel</button>
                </div>
            </div>
        </div>
    )
}
export default ProfileChange