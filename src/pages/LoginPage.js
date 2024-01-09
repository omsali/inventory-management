import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { alertError, alertSuccess } from '../components/Alert';

const LoginPage = () => {
    let navigate = useNavigate();

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md'

    const [cred, setCred] = useState({ username: "", password: "" });


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: cred.username, password: cred.password })
        });
        const json = await response.json();
        if (json.success === true) {
            console.log(json);
            localStorage.setItem("token", json.authToken);
            navigate('/');
            alertSuccess("Logged in Successfully");
        }
        else {
            alertError("Login Failed");
        }
    }

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='relative'>
            {/* <Navbar /> */}
            <div className=' bg-zinc-900 border border-black h-screen shadow-xl'>
                <div className='px-5 py-2 border border-sky-400 rounded-md m-6 bg-sky-300 cursor-pointer w-fit float-right' onClick={() => navigate("/signup")} >Signup</div>
                    <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-36 bg-sky-300'>
                        <div className='my-10 text-center font-bold text-4xl text-zinc-900 italic'>Login</div>
                        <div className='px-20 '>
                            <div className='mx-6 grid grid-cols-2 my-6'>
                                <label htmlFor="username" className='text-lg font-medium'>User Name: </label>
                                <input type="text"
                                    placeholder='User Name'
                                    name='username'
                                    onChange={handleChange}
                                    className={inputClass} />
                            </div>
                            <div className='mx-6 grid grid-cols-2 my-6'>
                                <label htmlFor="password" className='text-lg font-medium'>Password: </label>
                                <input type="password"
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleChange}
                                    className={inputClass} />
                            </div>
                        </div>
                        <div className='flex justify-center gap-8'>
                            <button type='submit' className={btnClass} onClick={handleLogin} >Login</button>
                        </div>
                    </div>
            </div>

        </div>
    )
}

export default LoginPage