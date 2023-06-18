import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreatePost (props){

    const {authenticated} = props
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
      if(!authenticated) navigate("/login")
    },[])
    const submitHandler = async (e) =>{
      e.preventDefault()
      const newPost = {
        title:e.target["title"].value,
        description:e.target["description"].value,
        content:e.target["content"].value,
      }

      try{
        const response = await axios.post(`${process.env.REACT_APP_BE_URL}/api/posts/create-post`, newPost, {
          headers : {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`
          }
        })
        e.target.reset()
        navigate("/posts")

      }
      catch(err){
        setErrorMessage(err.message)
      }
    }
    return(
      <>
      <form onSubmit={submitHandler}>
        <div className="block">
          <input
            type="text"
            name="title"
            required
            placeholder="Title"
          />
        </div>

        <div className="block">
          <input
            placeholder="Description"
            type="text"
            name="description"
            required
          />
        </div>

        <div className="block">
          <input
            placeholder="Content Details"
            type="text"
            name="content"
            required
          />
        </div>

        <button className={"submitbtn"} type = "submit">Post </button>
        <button className="cancelbtn" type="reset">Cancel</button>
      </form>
      {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
      </>
      )
}