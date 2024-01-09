import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { alertError, alertSuccess } from '../components/Alert';

const SignupPage = () => {
    let navigate = useNavigate();

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md'

    const adminPassword = "pune";

    const [showPassModal, setShowPassModal] = useState(false)
    const [cred, setCred] = useState({ name: "", username: "", password: "", role: "", cpass: "", adminPass: "" });

    const signup = async (e) => {
        const response = await fetch("http://localhost:5000/api/v1/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cred.name, username: cred.username, password: cred.password, role: cred.role })
        });
        const json = await response.json();
        console.log(json);

        localStorage.setItem("token", json.authToken);
        navigate('/login');
        alertSuccess("User created Successfully");
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        if (cred.password === cred.cpass) {
            if(( cred.role === "Admin" && cred.adminPass === adminPassword) || cred.role === "User" ){
                signup();
            } else {
                alertError("Admin Password is incorrect")
            }
        }
        else {
            // console.log("Please confirm your password");
            alertError("Reconfirm your Password, Password does not match");
        }
    }

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setCred({ ...cred, [e.target.name]: e.target.value })
        if (role === "Admin") { setShowPassModal(true); }
        else { setShowPassModal(false); }
    }

    return (
        <div className='relative'>
            {/* <Navbar /> */}
            <div className=' bg-zinc-900 border border-black h-screen shadow-xl'>
                <div className='px-5 py-2 border border-sky-400 rounded-md m-6 bg-sky-300 cursor-pointer w-fit float-right' onClick={() => navigate("/login")} >Login</div>
                <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-20 bg-sky-300'>
                    <div className='my-10 text-center font-bold text-4xl text-zinc-900 italic'>Sign up</div>
                    <div className='px-20 '>
                        <div className='mx-6 grid grid-cols-2 my-6'>
                            <label htmlFor="name" className='text-lg font-medium'>Name: </label>
                            <input type="text"
                                placeholder='Name'
                                name='name'
                                onChange={handleChange}
                                className={inputClass} />
                        </div>
                        <div className='mx-6 grid grid-cols-2 my-6'>
                            <label htmlFor="username" className='text-lg font-medium'>User Name: </label>
                            <input type="text"
                                placeholder='User Name'
                                name='username'
                                onChange={handleChange}
                                className={inputClass} />
                        </div>
                        <div className='mx-6 grid grid-cols-2 my-6'>
                            <label htmlFor="role" className='text-lg font-medium'>Role: </label>
                            <select className={inputClass} id='Pump Size' name='role' onChange={handleRoleChange}>
                                <option value="">Select Pump Size</option>
                                <option key="Admin" value="Admin">Admin</option>
                                <option key="User" value="User">User</option>
                            </select>
                        </div>
                        {showPassModal && <div className='mx-6 grid grid-cols-2 my-6'>
                            <label htmlFor="adminPass" className='text-lg font-medium'>Admin Password: </label>
                            <input type="password"
                                placeholder='Admin Password'
                                name='adminPass'
                                // value={adminPass}
                                onChange={handleChange}
                                className={inputClass} />
                        </div>}
                        <div className='mx-6 grid grid-cols-2 my-6'>
                            <label htmlFor="password" className='text-lg font-medium'>Password: </label>
                            <input type="password"
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                className={inputClass} />
                        </div>
                        <div className='mx-6 grid grid-cols-2 my-6'>
                            <label htmlFor="cpass" className='text-lg font-medium'>Confirm Password: </label>
                            <input type="password"
                                placeholder='Confirm Password'
                                name='cpass'
                                onChange={handleChange}
                                className={inputClass} />
                        </div>
                    </div>
                    <div className='flex justify-center gap-8'>
                        <button type='submit' className={btnClass} onClick={handleSignup} >Sign up</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignupPage