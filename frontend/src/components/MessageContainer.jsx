import React, { useEffect } from "react";
import Sendinput from "./Sendinput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const {selectedUser,authUser} = useSelector(store=>store.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    return () => dispatch(setSelectedUser(null))
  },[])
  return (
    <>
      {
        selectedUser !==null ? (
          <div className="md:min-w-[500px] flex flex-col">
      <div className="flex gap-2 items-center bg-gray-800 text-white px-4 py-2 mb-2">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser?.profilePhoto}
              alt="user profile"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 justify-between flex-1 ">
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages/>
      <Sendinput/>
    </div>
        ) : (
          <div  className="md:min-w-[500px] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold">Hi {authUser?.fullName}</h1>
          <h1>Let's start Conversation</h1>
          </div>
        )
      }
    </>
   
  );
};

export default MessageContainer;
