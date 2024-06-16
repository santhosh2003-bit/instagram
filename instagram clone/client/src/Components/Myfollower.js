import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Myfollower = () => {

    const navigator = useNavigate()
    const [data, setData] = useState([])
    //implement comment show concept
    const [commentshow, setCommentshow] = useState(false)
    //implement item
    const [item, setItem] = useState([])
    //comments state
    const [comment, setComment] = useState("")
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (!token) {
            navigator('/signup')
        }
        fetch("http://localhost:5001/myfollowpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
        })

            .then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result)
            })

            .catch((err) => console.log(err))
    },[])


    function toggleshow(posts) {
        if (commentshow) {
            setCommentshow(false)
        }
        else {
            setCommentshow(true)
            setItem(posts)
            console.log(posts)
        }
    }


    //like post

    const likepost = (id) => {
        fetch("http://localhost:5001/likes", {
            method: "put", headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                // console.log(result)
                const newData = data.map((posts) => {
                    if (posts._id === result._id) {
                        return result;
                    }
                    else {
                        return posts
                    }
                })
                setData(newData)
            })

    }


    //unlike post 
    const unlikepost = (id) => {
        fetch("http://localhost:5001/unlikes", {
            method: "put", headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                //console.log(result)
                const newData = data.map((posts) => {
                    if (posts._id === result._id) {
                        return result;
                    }
                    else {
                        return posts
                    }
                })
                setData(newData)
            })
    }

    //comment function

    const makeComment = (id, text) => {
        // console.log(comment)
        fetch("http://localhost:5001/comments", {
            method: "put", headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                text: text,
                postId: id
            })
        }).then((res) => res.json())

            .then((result) => {
                console.log(result)
                const newData = data.map((posts) => {
                    if (posts._id === result._id) {
                        return result;
                    }
                    else {
                        return posts
                    }
                })
                setData(newData)
                setComment("")
            }
            )
    }


    return (
        <div className='home'>
            {/* card  */}
            {
                data.map((posts, index) => {
                    return (
                        <div className='card' key={index}>
                            {/* card header */}

                            <div className='card-header'>
                                <div className='card-pic'>
                                    <img src='https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile' />
                                </div>
                                <h5>
                                    <Link to={`/profile/${posts.postedBy._id}`}>
                                        {posts.postedBy.name}
                                    </Link>
                                </h5>
                            </div>
                            {/* card image */}
                            <div className='card-image'>
                                <img src={posts.photo} alt='logo' />
                            </div>
                            {/* card content */}
                            <div className='card-content'>
                                {
                                    posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id) ? <span className="material-symbols-outlined material-symbols-outlined-red " onClick={() => unlikepost(posts._id)}>
                                        favorite
                                    </span> :
                                        <span className="material-symbols-outlined" onClick={() => likepost(posts._id)}>
                                            favorite
                                        </span>
                                }


                                {/* here we print the length of the likes arrays */}
                                <p>{posts.likes.length} Like</p>

                                <p>{posts.body}</p>
                                <p style={{ fontWeight: "bolder", textDecoration: "underline", cursor: "pointer" }} onClick={() => toggleshow(posts)}>View all  Comments</p>
                            </div>
                            {/* Add comment */}
                            <div className='add-comment'>
                                <span className="material-symbols-outlined">mood</span>
                                <input type='text' placeholder="Add Comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button onClick={() => makeComment(posts._id, comment)}>post</button>
                            </div>

                        </div>
                    )
                })
            }

            {/* here show the comment frame */}
            {
                commentshow && <div className="showComment" >
                    <div className="close" onClick={() => toggleshow()}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                    <div className="container">
                        <div className="postPic">
                            <img src={item.photo} alt="logo" />
                        </div>
                        <div className="details">
                            {/* comment header */}
                            <div className='card-header' style={{ borderBottom: "1px solid gray" }}>
                                <div className='card-pic'>
                                    <img src='https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile' />
                                </div>
                                <h5>{item.postedBy.name}</h5>
                            </div>
                            {/* comment section */}

                            <div className="comment-section" style={{ borderBottom: "1px solid gray" }} >
                                {
                                    item.comments.map((v, index) => {
                                        return (
                                            <p key={index}>
                                                <div className='card-pic'>
                                                    <img src='https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile' />
                                                </div>
                                                <span className='commenter' style={{ fontWeight: "bolder" }}>{v.postedBy.name}</span>
                                                <span className='textenter'>{v.comment}</span>
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
                                <input type="text" placeholder='Add Comment.....' value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button onClick={() => {
                                    makeComment(item._id, comment)
                                    toggleshow()
                                }}>post</button>
                            </div>

                        </div>
                    </div>


                </div>
            }

        </div>
    )
}

export default Myfollower