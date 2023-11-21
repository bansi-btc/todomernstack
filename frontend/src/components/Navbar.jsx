import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userdetails}) => {
    let navigate=useNavigate();
    let handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
  return (
    <div className='wrapper shadow shadow-gray-500 text-gray-900 py-2'>
        <div className='max-w-[1000px] mx-auto flex flex-row items-center justify-between'>
            <div className='text-xl font-semibold'>Todo App</div>

            <div className='flex flex-row items-center justify-center gap-2'>
                <div className=' bg-purple-500 text-white py-[3px] rounded-sm px-4' onClick={handleLogout}>Logout</div>
                <div className=' bg-gray-200  text-gray-900 py-[3px] rounded-lg px-4'>Hey {userdetails}</div>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar