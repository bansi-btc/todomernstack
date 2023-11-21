import React, { useEffect, useState } from 'react'
import Todo from './Todo';
import axios from 'axios'

const TodoContainer = () => {
    const [todos, settodos] = useState([]);
    const [comptodos, setcomptodos] = useState([]);
    const [loading, setloading] = useState(false);
    const [pending, setpending] = useState(true);

    const [inputData, setinputData] = useState('');
    let fetchData=async()=>{
        setloading(true);
        try{

            let res=await fetch('http://localhost:3000/api/v1/getTodos', {
                headers:{
                    'token':localStorage.getItem('token'),
                }
            });
            let output=await res.json();
            // console.log(output);
            
            let pendingTodos=output.filter((ele)=>{
                return ele.status==='pending';
            })
            let compTodos=output.filter((ele)=>{
                return ele.status!=='pending';
            })
            
            // console.log(output);
            // console.log(pendingTodos);
            // console.log(compTodos);

            settodos(pendingTodos);
            setcomptodos(compTodos);
        }
        catch(err){
            console.log(err);
        }
        setloading(false);
    }
    let cnt=0;
    useEffect(()=>{
        fetchData();
        
    }, [])

    let handleChange=(event)=>{
        setinputData(event.target.value);
    }

    let addData=async()=>{
        // let res=await fetch('http://localhost:3000/api/v1/createTodo')
        setloading(true);
        let data={
            title:inputData,
        }
        let res=await axios.post('http://localhost:3000/api/v1/createTodo', data, {
            headers:{
                'token':localStorage.getItem('token'),
            }
        } );
        // let res=await fetch('http://localhost:3000/api/v1/createTodo', {
        //     method: 'Post',
        //     headers:{
        //         'token':localStorage.getItem('token'),
        //     }
        // })
        fetchData();

        // console.log(res);
    }

    let handleAdd=()=>{
        addData();
    }
  return (
    <div className='max-w-[600px] mx-auto'>
        {loading && <div className='flex flex-col items-center justify-center text-3xl font-semibold py-10'>loading</div>}
    {!loading && 
    <div className='max-w-[600px] mx-auto flex flex-col items-center justify-center gap-5 mt-10'>
        <div className='flex flex-row justify-start self-start items-center gap-5'>
            <div className={`${pending?"bg-purple-500 text-gray-100":"bg-gray-100 text-gray-800"}  rounded-sm py-1 px-6`} onClick={()=>{setpending(true)}}>Pending</div>
            <div className={`${!pending?"bg-purple-500 text-gray-100":"bg-gray-100 text-gray-800"} rounded-sm py-1 px-6 flex flex-row items-center justify-center gap-2`} onClick={()=>{setpending(false)}}>
                <div className='h-3 w-3 rounded-full bg-green-400'></div>
                <div>Completed</div>
            </div>
        </div>
    
    <div className='w-full flex flex-row items-center justify-between'>
        <input type="text" placeholder='Enter task to add' className='border border-gray-400 rounded-sm w-[80%] py-1 px-2' onChange={handleChange} value={inputData}/>

        <button className="btn bg-purple-500 text-white px-4 py-1 rounded-sm" onClick={handleAdd}>Add task</button>
    </div>
    {pending && <div className='w-full mx-auto bg-gray-300 border border-gray-300 rounded-md flex flex-col items-start justify-center gap-2 px-4 py-4 '>
        {todos.map((todo)=>{
            return  <Todo key={cnt++} fetchData={fetchData} setloading={setloading} {...todo}/>
        })}
       
        
        
    </div>}
    {!pending && <div className='w-full mx-auto bg-gray-300 border border-gray-300 rounded-md flex flex-col items-start justify-center gap-2 px-4 py-4 '>
        {comptodos.map((todo)=>{
            return  <Todo key={cnt++} fetchData={fetchData} setloading={setloading} {...todo}/>
        })}
       
        
        
    </div>}
    </div>}
</div>
  )
}

export default TodoContainer