import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import TodoContainer from './TodoContainer';

const Home = () => {
    let navigate=useNavigate();
    const [userdetails, setuserdetails] = useState('');
    const [loading, setloading] = useState(false)
   
    let fetchData=async()=>{
        setloading(true);
        try{

            let output=await fetch('http://localhost:3000/api/v1/getDetails', {
                headers:{
                    'token':localStorage.getItem('token')
                }
            });
            let res= await output.json();
            // console.log(res);
            setuserdetails(res.email);


        }
        catch(err){
            console.log(err.message);
        }
        setloading(false);
    }

    useEffect(()=>{
        let token=localStorage.getItem('token');
        if(!token){
            localStorage.removeItem('token');
            navigate('/login')
        }
        else{
            fetchData();

        }
    }, []);
    
  return (
    <div>
        {loading?<div className='text-3xl font-semibold flex flex-col items-center justify-center'>Loading</div>:
        
        <div className=''>
            <Navbar userdetails={userdetails}/>
            <TodoContainer/>
        </div>}
    </div>
  )
}

export default Home