import axios from "axios";
import React from "react";
import './Card.css'

export default function Card(props){
const {post, userId, getPosts} = props;

const deletePostHandler = async () =>{
  try{
    const response = await axios.delete(`${process.env.REACT_APP_BE_URL}/api/posts/delete-post/${post._id}`, {
      headers:{
        'Authorization' :  `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`
      }
    })
    getPosts()
  }
  catch(err){
    console.log(err.message)
  }
 
}
return (<div className="cards" key={post._id}>
<h4>Title: {post.title}</h4>
<h4>Message: {post.content}</h4>
<h4>Creator: {post.owner.firstName}</h4>

<hr />
{userId === post.owner._id && <button className="deletebtn" onClick={deletePostHandler}>
  delete
</button>}

<button
  className="update-icon"
  onClick={() => {}}
>
  update
</button>
</div>)
}