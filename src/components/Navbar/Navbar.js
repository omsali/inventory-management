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
        <div className='sticky top-0 h-14 w-full bg-sky-200 flex gap-14 text-zinc-900 text-lg font-bold italic z-10 border border-sky-300 rounded-b-xl'>
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
                <div>Stock</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/customersheet")}
            >
                <div>Customer Book Sheet</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/dispatchedpumps")}
            >
                <div>Dispatched Pump</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/orderlist")}
            >
                <div>Order list</div>
            </div>
            <div
                className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer '
                onClick={() => navigate("/dismantledpumps")}
            >
                <div>Dismantled Pumps</div>
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