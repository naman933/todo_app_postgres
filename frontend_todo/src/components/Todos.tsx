import axios from 'axios';
export function Todos({todos}){
    const backendUrl = "http://localhost:3000/api/todo/updateTodo";
    return <div>
        {todos.map(function(todo : any){
            return <div key = {todo} className="m-5 items-center justify-center">
                <li className="font-semibold text-lg pb-3 font-poppins">{todo.title}</li>
                <button className="border-2 font-semibold text-xs p-2 rounded-full items-center justify-center" onClick={async ()=>{
                    const token = localStorage.getItem('token');
                    const response = await axios.put(backendUrl, JSON.stringify({
                        id : todo.id
                    }), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization : `Bearer ${token}`,
                        },
                    });
                }}>{todo.done == true ? "Completed" : "Mark as Complete"}</button>
            </div>
        })}
    </div>
}