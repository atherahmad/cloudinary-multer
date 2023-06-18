/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";

import Posts from "./Component/Posts";
import Login from "./Component/Login";
import NotFound from "./Component/NotFound";
import SignUp from "./Component/SignUp.jsx";
import Home from "./Component/Home";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import { useState } from "react";
import CreatePost from "./Component/CreatePost";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");


  const logoutHandler = () => {
    setAuthenticated(false);
    localStorage.removeItem("my-app-token");
  };

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('my-app-token'))
    console.log(token)
    if(token !== null){
      axios.get(`${process.env.REACT_APP_BE_URL}/api/auth/authorize-user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response=>{
        setUserName(response.data.userName)
        setAuthenticated(true)})
      .catch(err=>{
        localStorage.removeItem("my-app-token")

      })
    }
  }, [])
  return (
    <>
      <Header
        authenticated={authenticated}
        userName={userName}
        setAuthenticated={setAuthenticated}
        logoutHandler={logoutHandler}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setAuthenticated={setAuthenticated}
              setUserName={setUserName}
              setUserId={setUserId}
            />
          }
        />
        <Route path="/posts" element={<Posts userId={userId}/>} />
        <Route path="/create-post" element={<CreatePost authenticated={authenticated}/>}/>
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
