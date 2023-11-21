import React from 'react'
import axios from 'axios';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
const Todo = ({title, _id, fetchData, setloading}) => {

    let markComp=async()=>{
        setloading(true);
        let res=await axios.put(`http://localhost:3000/api/v1/todoCompleted/${_id}`);
        console.log(res);
        await fetchData();
        setloading(false);

    }
    let markDel=async()=>{
        setloading(true);
        let res=await axios.delete(`http://localhost:3000/api/v1/deleteTodo/${_id}`, {
            headers:{
                'token':localStorage.getItem('token'),
            }
        });
        // console.log(res);
        await fetchData();
        setloading(false);

    }
    let handleCompleted=()=>{
        markComp();
    }

    let handleDelete=()=>{
        markDel();
    }
  return (
    <div className='flex flex-row items-center justify-between w-full'>
    <div>
        {title}
    </div> 
    <div className='flex flex-row items-center justify-center gap-4'>
        <div onClick={handleCompleted}><IoMdCheckmarkCircleOutline className='text-xl text-green-600'/></div>
        <div onClick={handleDelete}><RiDeleteBin6Line className='text-xl text-red-400'/></div>
    </div>
</div>
  )
}

export default Todo