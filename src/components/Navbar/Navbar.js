import React from 'react'
import { useNavigate } from "react-router";
import { alertSuccess } from '../Alert';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.setItem('token', "");
        navigate('/login');
        alertSuccess("Logout Successfully");
      }

    return (
        <div className='sticky top-0 h-14 w-full bg-sky-200 flex gap-20 text-zinc-900 text-lg font-bold italic z-10 border border-sky-300 rounded-b-xl'>
            <div className='px-8 pt-2 text-2xl cursor-pointer'
                onClick={() => navigate("/")}
            >Pune - Pumps</div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/addpump")}
            >
                <div>Add Pump</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/enquirepump")}
            >
                <div>Enquire and Dispatch</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/dispatchedpumps")}
            >
                <div>Dispatched Pump</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer absolute right-5'
                onClick={handleLogout}
            >
                <div>Logout</div>
            </div>
        </div>
    )
}

export default Navbar