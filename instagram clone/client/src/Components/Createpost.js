import React, { useState,useEffect } from 'react'
import './Createpost.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Createpost = () => {
    const navigate=useNavigate();
    const [body, setBody] = useState("")
    const [image,setImage]=useState("")
    const [imageurl,setImageurl]=useState("")
    const loadFile = function(event) {
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output');
          output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      };

// posting images to cloudinary

function postShare(){
    // console.log(body,image)
    const data=new FormData();
    data.append("file",image)
    //mention which application to upload
    data.append("upload_preset","insta-clone");
    //mention cloud names and details
    data.append("cloud_name","santhoshcloud")
    fetch("https://api.cloudinary.com/v1_1/santhoshcloud/image/upload",{method:"post",body:data}).then((res)=>res.json())
    .then((data)=>setImageurl(data.url))
    
    .catch((err)=>console.log(err))
    
}

useEffect(() => {
  //Upload image into mongoose

  //here again we got one problem because this useEffect is called Mounte the component so use one condition then solve that problem
  if(imageurl){

      fetch("http://localhost:5001/createpost",{method:"post",headers:{"Content-Type":"application/json","Authorization":"Bearer "+ localStorage.getItem('jwt')},body:JSON.stringify({body,photo:imageurl})})
      .then((res)=>res.json())
      .then((data)=>{
        //in this data we have an object that if you provide correct creadentials then its provide success image url and image details other wise it produce data.error message we provide in createpost.js in backend file
        if(data.error){
            notifyA(data.error)
        }
        else{
            notifyB("Successfully Posted")
            navigate("/")
        }
      })
      .catch((err)=>console.log(err))
  }
},[imageurl]);

const notifyA=(msg)=>{
    toast.error(msg)
}
const notifyB=(msg)=>{
toast.success(msg)
}

    return (
        <div className='createpost'>
            <div className='post-header'>
                <h4 style={{margin:"3px auto"}}>Create New Post</h4>
                <button id='post-btn' onClick={()=>postShare()}>Share</button>
            </div>
            <div className='main-div'>
                <img id='output'  src="https://ionicframework.com/docs/img/demos/thumbnail.svg" alt='upload'/>
                <input type='file' accept='image/*' onChange={(event)=>{loadFile(event) ;setImage(event.target.files[0])}}/>
            </div>
            <div className='details'>
                <div className='card-header'>
                    <div className='card-pic'>
                        <img src='https://media.istockphoto.com/id/819419874/photo/young-woman-summer-portrait-outdoors.jpg?s=612x612&w=is&k=20&c=tt1MuxLOhLF8zymi25H7JGOLpfxqQahhlZyG0hktCBY=' alt='logo' />
                    </div>
                    <h5>Divya</h5>
                </div>
                <textarea value={body} onChange={(e)=>setBody(e.target.value)} type="text" placeholder='Write Text Here...'></textarea>
            </div>
        </div>
    )
}

export default Createpost