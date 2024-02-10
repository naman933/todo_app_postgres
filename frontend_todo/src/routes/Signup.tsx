import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
export function Signup () {
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] =useState("");
    const navigate = useNavigate();
    const backendUrl="http://localhost:3000/api/user/signup";

    const signUp = async() => {
        const data = {username, password, name};
        const response = await axios.post(backendUrl, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
              },
        });

        if (response && !response.data.err){
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate("/dashboard");
            window.location.reload();
        }else{
            alert("Failure");
        }
        return ;
    }

    return (
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="flex flex-col items-center justify-center border-2 p-8 rounded-xl">
                    <div className="text-3xl font-bold">Sign Up</div>
                    <div className="my-2 text-gray-500">Enter your information to create an account</div>
                    <TextInput label="Name" placeholder="John Doe" className="my-2" value={name} setValue={setName}/>
                    <TextInput label="Username" placeholder="johndoe@example.com" className="my-2 mb-4" value={username} setValue={setUsername}/>
                    <PasswordInput label="Password" placeholder="" value={password} setValue={setPassword} />
                    <div className="w-full flex items-center justify-end my-4">
                        <button className="w-full font-semibold bg-black p-3 px-10 rounded-lg text-white" onClick={(e)=> {e.preventDefault(); signUp();}}>Sign Up</button>
                    </div>
                    <div className="font-bold mb-4 my4 flex  w-full items-center justify-center">
                        <div className="font-semibold">Already have an account?</div>
                        <Link className="font-semibold mx-2 underline" to="/signin">Login</Link>
                    </div>
                </div>
            </div>
    )
}