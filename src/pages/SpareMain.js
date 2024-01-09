import React from 'react'
import { useNavigate } from "react-router";
import SpareNavbar from '../components/Navbar/SpareNavbar';

const SpareMain = () => {
    const navigate = useNavigate();
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer'

    return (
        <div className='bg-zinc-900 border border-black h-screen shadow-xl'>
            <SpareNavbar />
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-28 bg-sky-300'>
                <div className='my-16 text-center font-bold text-5xl text-zinc-900 italic'>SPARES</div>
                <div className='flex justify-center align-middle my-16'>
                    <div
                        className={btnClass}
                        onClick={() => navigate("/addspare")}
                    >
                        <div>Add Spare</div>
                    </div>
                    <div
                        className={btnClass}
                        onClick={() => navigate("/enquirespare")}
                    >
                        <div>Search and Dispatch</div>
                    </div>
                    <div
                        className={btnClass}
                      onClick={() => navigate("/dispatchspare")}
                    >
                        <div>Dispatch Spare</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpareMain