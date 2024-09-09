import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user)
    const selectedUserHandler = (user)=>{
        // console.log(user)
        dispatch(setSelectedUser(user))
    }
  return (
    <div>
        <div>
        <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
        <div className='avatar online'>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user profile"/>
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-2 justify-between flex-1 '>
                    <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </div>
    </div>
  )
}

export default OtherUser