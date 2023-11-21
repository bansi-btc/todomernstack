import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { IoEye, IoPawSharp } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [showPass, setshowPass] = useState(false);
    const [cnfshowPass, setcnfshowPass] = useState(false);
    const [email, setemail] = useState('');
    const [pwd, setpwd] = useState('');
    const [cnfpwd, setcnfpwd] = useState('');
    const [checkstatus, setcheckstatus] = useState(false);
    const [loading, setloading] = useState(false)
    const navigate=useNavigate();

    let handleEmailChange=(event)=>{
        setemail(event.target.value);
    }
    let handlePwdChange=(event)=>{
        setpwd(event.target.value);
    }
    let handleCnfPwdChange=(event)=>{
        setcnfpwd(event.target.value);
    }

    let handleCheck=(event)=>{
        setcheckstatus(event.target.checked);
    }
    let registerUser=async()=>{
        try{
            
            let data={
                email:email,
                password:pwd
            }
            
            let output=await axios.post('http://localhost:3000/api/v1/signup', data);
            console.log(output);
        }
        catch(err){
            console.log(err.message);
        }
    }

    let handleRegister=async()=>{
        if(!checkstatus){
            return;
        }
        if(pwd!==cnfpwd){
            return;
        }
        setloading(true);
        await registerUser();
        setloading(false);
        navigate('/login');
        

    }
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full bg-purple-500'>
        {loading && <div className='flex flex-col items-center justify-center text3xl font-semibold'>Loading</div>}
        {!loading && 
        <div className='w-[450px] bg-gray-100 rounded-md flex flex-col items-center justify-center py-20 px-10 gap-6'>

            <div className='w-full flex flex-col items-center justify-between gap-3'>
                <div className='w-full flex flex-row items-center justify-between gap-2'>
                    <input type="text" placeholder='FIRST NAME' className='w-[48%] border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' />
                    <input type="text" placeholder='LAST NAME' className='w-[48%] border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' />
                </div>
                <input type="text" placeholder='ENTER EMAIL ID' className='w-full border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' onChange={handleEmailChange} value={email}/>
                <div className='w-full flex flex-col items-center justify-center relative'>
                <input type={`${showPass?"text":"password"}`} placeholder='ENTER PASSWORD' className='w-full border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' onChange={handlePwdChange} value={pwd} />
                 
                {!showPass && <FaEyeSlash className='absolute right-3' onClick={()=>{setshowPass(prev=>!prev)}}/>}
                {showPass && <IoEye className='absolute right-3'  onClick={()=>{setshowPass(prev=>!prev)}}/>}
                </div>
                <div className='w-full flex flex-col items-center justify-center relative'>
                <input type={`${cnfshowPass?"text":"password"}`} placeholder='CONFIRM PASSWORD' className='w-full border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' onChange={handleCnfPwdChange} value={cnfpwd} />
                {!cnfshowPass && <FaEyeSlash className='absolute right-3'  onClick={()=>{setcnfshowPass(prev=>!prev)}}/>}
                {cnfshowPass && <IoEye className='absolute right-3'  onClick={()=>{setcnfshowPass(prev=>!prev)}}/>}
                </div>

            </div>

            <div className='flex flex-row items-baseline justify-center px-10'>
                <input type="checkbox" name="" id="" className='relative top-[2px]' onChange={handleCheck} checked={checkstatus} />
                <div className='text-center text-sm text-gray-600'>By clicking this button, you agree to the Anit-spam policy adn terms of Use</div>
            </div>

            <button className="btn flex flex-col items-center justify-center bg-purple-500 px-14 py-1 text-white rounded-md" onClick={handleRegister}>REGISTER</button>
        </div>}
    </div>
  )
}

export default Register