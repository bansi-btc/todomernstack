import React, { useEffect, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { IoEye, IoPawSharp } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';

const Login = () => {
    const [showPass, setshowPass] = useState(false);
    const [email, setemail] = useState('');
    const [pwd, setpwd] = useState('');
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
    let loginUser=async()=>{
        setloading(true);
        try{
            let data={
                email:email,
                password:pwd,
            }
            let output=await axios.post('http://localhost:3000/api/v1/login', data);
            // console.log(output.data);
            console.log(output.data.user);
            if(output.data.user==='notfound'){
                console.log("HImanshu");
                alert("User not found");
                setloading(false);
                navigate('/login');
                return false;
            }
            if(output.data.user==='passwordincorrect'){
                console.log("HImanshu");
                alert("password incorrect");
                setloading(false);
                navigate('/login');
                return false;
            }
            localStorage.setItem('token', output.data.user);
            navigate('/login');

            setloading(false);
            return true;
        }
        catch(err){
            console.log(err.message);
            setloading(false);
            navigate('/login');

            return false;
        }
    }

    let handleLogin=async()=>{
        if(!email || !pwd){
            return;
        }
        if(await loginUser()){
            navigate('/');

        }
        
        // setloading(true);
        // await registerUser();
        // setloading(false);
        

    }

    useEffect(()=>{
        localStorage.removeItem('token');
    }, [])
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full bg-purple-500'>
        {loading && <div className='flex flex-col items-center justify-center text3xl font-semibold'>Loading</div>}
        {!loading && 
        <div className='w-[450px] bg-gray-100 rounded-md flex flex-col items-center justify-center py-20 px-10 gap-6'>

            <div className='w-full flex flex-col items-center justify-between gap-3'>
                
                <input type="text" placeholder='ENTER EMAIL ID' className='w-full border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' onChange={handleEmailChange} value={email}/>
                <div className='w-full flex flex-col items-center justify-center relative'>
                <input type={`${showPass?"text":"password"}`} placeholder='ENTER PASSWORD' className='w-full border border-gray-400 py-1 px-2 rounded-sm focus:outline-none text-gray-600' onChange={handlePwdChange} value={pwd} />
                 
                {!showPass && <FaEyeSlash className='absolute right-3' onClick={()=>{setshowPass(prev=>!prev)}}/>}
                {showPass && <IoEye className='absolute right-3'  onClick={()=>{setshowPass(prev=>!prev)}}/>}
                </div>

            </div>

            <div className='flex flex-row items-baseline justify-center px-10'>
                <input type="checkbox" name="" id="" className='relative top-[2px]' onChange={handleCheck} checked={checkstatus} />
                <div className='text-center text-sm text-gray-600'>By clicking this button, you agree to the Anit-spam policy adn terms of Use</div>
            </div>

            <button className="btn flex flex-col items-center justify-center bg-purple-500 px-14 py-1 text-white rounded-md w-full" onClick={handleLogin}>LOGIN</button>

            <div className='w-full flex flex-row items-center justify-between gap-3'>
                <div className='h-[1px] w-full bg-gray-500'></div>
                <div className='text-gray-500'>OR</div>
                <div className='h-[1px] w-full bg-gray-500'></div>
            </div>

            <div className="btn flex flex-row items-center justify-center bg-gray-200 px-14 py-1 text-purple-600 rounded-md w-full relative" onClick={handleLogin}>
                <div><Link to={'/signup'}>CREATE A PROFILE</Link></div>
                <div className='h-[32px] w-[32px] bg-purple-400 rounded-full absolute right-[-7px] flex flex-col items-center justify-center'>
                    <MdAdd className='text-white font-semibold text-lg'/>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Login