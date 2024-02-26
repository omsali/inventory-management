import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router";
import { alertSuccess } from '../Alert';
import ReportCard from '../PumpsCard/ReportCard';

const Navbar = () => {
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
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/addpump') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/addpump")}
                >
                    <div>Add Pump</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/enquirepump') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/enquirepump")}
                >
                    <div>Stock</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/customersheet') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/customersheet")}
                >
                    <div>Customer Book Sheet</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/dispatchedpumps') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/dispatchedpumps")}
                >
                    <div>Dispatched Pump</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/orderlist') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/orderlist")}
                >
                    <div>Order list</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/dismantledpumps') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/dismantledpumps")}
                >
                    <div>Dismantled Pumps</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(showReport) ? "underline text-zinc-600" : ""}`}
                    onClick={() => setShowReport(!showReport)}
                >
                    <div>Report</div>
                </div>
                <div
                    className={`pt-3 hover:underline hover:text-zinc-600 cursor-pointer ${(location.pathname === '/mou') ? "underline text-zinc-600" : ""}`}
                    onClick={() => navigate("/mou")}
                >
                    <div>MOU</div>
                </div>
                <div
                    className='pt-3 hover:underline hover:text-zinc-600 cursor-pointer absolute right-5'
                    onClick={handleLogout}
                >
                    <div>Logout</div>
                </div>

            </div>
            {showReport && <ReportCard />}
        </div>
    )
}

export default Navbar