import React from 'react'
import { useNavigate } from 'react-router-dom';

const SpareEnquiry = () => {
    const navigate = useNavigate();

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 w-60'

    return (
        <div className='bg-zinc-900 border border-black h-screen shadow-xl'>
            {/* <div className='px-5 py-2 border border-sky-400 rounded-md m-6 bg-sky-300 cursor-pointer w-fit float-right' onClick={handleLogout}>Logout</div> */}
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-28 bg-sky-300'>
                <div className='my-16 text-center font-bold text-5xl text-zinc-900 italic'>Spares Enquiry Register</div>
                <div className='flex justify-center align-middle my-16'>
                    <div
                        className={btnClass}
                        onClick={() => navigate("/addspareqtn")}
                    >
                        <div>Add Quatation</div>
                    </div>
                    <div
                        className={btnClass}
                        onClick={() => navigate("/allsparesquotation")}
                    >
                        <div>Quotation List</div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default SpareEnquiry