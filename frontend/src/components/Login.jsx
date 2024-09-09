import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
  const [user,setUser] = useState({
    username:"",
    password:"",
  })
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const submitHanhler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
        navigate('/')
      dispatch(setAuthUser(res.data))
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error:", error);
    }
    setUser({
    username:"",
    password:"",
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">LogIn</h1>
        <form onSubmit={submitHanhler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
            value = {user.username}
            onChange = {(e)=>setUser({...user,username:e.target.value})}
              className="w-full input input-border h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
            value = {user.password}
            onChange = {(e)=>setUser({...user,password:e.target.value})}
              className="w-full input input-border h-10"
              type="password"
              placeholder="password"
            />
          </div>
          <p className="text-center my-2">
            Don't have an account? <Link to="/register"> SignUp</Link>
          </p>
          <div>
            <button className="btn btn-block btn-md mt-2 border-slate-700" type="submit">
              LogIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
