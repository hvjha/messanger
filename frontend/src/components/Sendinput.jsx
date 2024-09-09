import axios from 'axios';
import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
const Sendinput = () => {
  
  const [message,setMessage] = useState(" ");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user)
  const {messages} = useSelector(store=>store.message)
  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      console.log(res);
      dispatch(setMessages([...messages,res?.data?.newMessage]))
    } catch (error) {
      console.log(error)
    }
    setMessage("");
  }
  return (
    <div>
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
            <input 
            value = {message}
            onChange = {(e)=>setMessage(e.target.value)}
            type="text"
            placeholder="send message"
            className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
            />
            <button type="submit"className='absolute flex items-center inset-y-0 end-0 pr-4'>
            <IoMdSend size="25px"/>
            </button>
            </div>
        </form>
    </div>
  )
}

export default Sendinput