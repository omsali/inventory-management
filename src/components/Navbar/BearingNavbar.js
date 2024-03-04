import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router";
import { alertSuccess } from '../Alert';

const BearingNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [showReport, setShowReport] = useState(false)

    const handleLogout = () => {
        localStorage.setItem('token', "");
        navigate('/login');
        alertSuccess("Logout Successfully");
    }

    return (
        <div>
            <div className='sticky top-0 h-14 w-full bg-sky-200 flex gap-14 text-zinc-900 text-lg font-bold italic z-10 border border-sky-300 rounded-b-xl'>
                <div className='px-8 pt-2 text-2xl cursor-pointer'
                    onClick={() => navigate("/")}
                >Pune - Pumps</div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/addbearing') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/addbearing")}
                >
                    <div>Add Bearing</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/enquirebearing') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/enquirebearing")}
                >
                    <div>Stock</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/customersheetbearing') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/customersheetbearing")}
                >
                    <div>Customer Book Sheet</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/dispatchbearing') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/dispatchbearing")}
                >
                    <div>Dispatched Bearing</div>
                </div>
                <div
                    className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer absolute right-5'
                    onClick={handleLogout}
                >
                    <div>Logout</div>
                </div>

            </div>
        </div>
    )
}

export default BearingNavbar
