import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios'
import  toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
const Sidebar = () => {
  const [search,setSearch] = useState("");
  const {otherUsers} = useSelector(store=>store.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/logout`);
      navigate("/login")
      toast.success(res.data.message);
    } catch (error) {
      console.log(error)
    }
  }
  const submitHandler = (e)=>{
    e.preventDefault();
    const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User not found!");
    }
    
  }
  return (
    <div className='border border-slate-500 p-4 flex flex-col'>
        <form onSubmit={submitHandler} className='flex items-center gap-2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className="input input-bordered rounded-md"type="text" placeholder='search...'/>
            <button type="submit" className='btn  bg-gray-800'><BiSearchAlt2 size="20px"/></button>
        </form>
        <div className='divider px-3'></div>
    <OtherUsers/>
    <div className='mt-2'>
      <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
    </div>
    </div>
  )
}

export default Sidebar