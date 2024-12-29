import { useState } from "react";
import {useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/AuthSlice";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email: "",
        password:""
    })
    const handleInputChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

   

    async function onLogin (event) {
        event.preventDefault();
        if(!formData.email || !formData.password){
            toast.error("Please fill all the details")
            return;
        }
        const response = await dispatch(loginUser(formData));
        console.log(response)
        if(response?.payload?.success)
            navigate("/");

        setFormData({
            email: "",
            password:""
        })
    };

    return (
        <div>
            <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-blue-600 hover:bg-blue-400 text-white transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login
                    </button>

                    <p className="text-center">
                        Don't hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;