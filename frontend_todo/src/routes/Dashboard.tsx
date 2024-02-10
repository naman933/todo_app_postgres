import { useState } from 'react'
import { CreateTodo } from '../components/CreateTodo'
import { Todos } from '../components/Todos'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Dashboard () {
    const [todos, setTodos] = useState([]);
    const userId = 123;
    const data = {userId};
    const backendUrl = "http://localhost:3000/api/todo/getTodos";

    const navigate = useNavigate();
    const tokenDelete = () => {
        window.location.reload();
        navigate("/signin");
        localStorage.removeItem('token');
    }

    async function todosdata () {
        const token = localStorage.getItem('token');
        const response = await axios.get(backendUrl, {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`,
              },
        });
        setTodos(response.data.todo);
    }
    
    todosdata();
  
    return (
      <div className=' bg-gray-500 overflow-auto'>
        <div className='w-screen h-screen flex flex-col'>
            <div className="p-10 text-3xl items-left bg-black text-white flex justify-between">
                <div>
                    ToDo App !!
                </div>
                <div>
                    <button className="bg-gray-300 text-black px-3 text-sm p-2 rounded-full" onClick={(e) => {e.preventDefault(); tokenDelete()}}>Log out!</button>
                </div>
            </div>
            <div className='w-full flex divide-x justify-center pt-10'>
                <CreateTodo></CreateTodo>
                <Todos todos={todos}></Todos>
            </div>
       </div> 
      </div>
    )
}