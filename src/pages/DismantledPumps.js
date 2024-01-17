import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import { alertError, alertSuccess } from '../components/Alert';

const DismantledPumps = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000',
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-auto my-4 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500 w-fit '
    const inputClass = 'px-5 py-2 border border-sky-300 bg-sky-300 rounded-md m-2 '

    const [pumps, setPumps] = useState([])

    useEffect(() => {
        api.get('api/v1/getdismantlepumps').then((response) => {
            setPumps(response.data.pumps);
            console.log(response.data.pumps);
        });
    }, []);

    return (
        <div className=''>
            <Navbar />
            {/* {console.log(pumps)} */}
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Dismantled Pumps</div>
                {/* <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download Order List</button> */}

                {(pumps && pumps.length !== 0) &&
                    <div className='flex text-center'>
                        <div className='border-2 ml-4 w-[100px] p-4 border-sky-600'><b>Sr. no. </b></div>
                        <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-6`}>
                            <div className='border p-4 border-sky-600'><b>Pump Type </b></div>
                            <div className='border p-4 border-sky-600'><b>Pump Size </b></div>
                            <div className='border p-4 border-sky-600'><b>MOC </b></div>
                            <div className='border p-4 border-sky-600'><b>SO. NO </b></div>
                            <div className='border p-4 border-sky-600'><b>Sealing </b></div>
                            <div className='border p-4 border-sky-600'><b>Dismantled Parts </b></div>
                            {/* {<div className='border p-4 border-sky-600 '><b>Operations </b></div>} */}
                        </div>
                    </div>}
                {pumps &&
                    pumps.map((pump, index) => {
                        return (
                            <div className='flex text-center'>
                                <div className='border-2 ml-4 w-[100px] p-4 border-sky-600'>{index + 1}</div>
                                <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-6`}>
                                    <div className='border p-4 border-sky-600'>{pump.pumpType} </div>
                                    <div className='border p-4 border-sky-600'>{pump.pumpSize} </div>
                                    <div className='border p-4 border-sky-600'>{pump.moc} </div>
                                    <div className='border p-4 border-sky-600'>{pump.so} </div>
                                    <div className='border p-4 border-sky-600'>{pump.seal} </div>
                                    <select className={`${inputClass} border p-4 border-sky-400`}>
                                        {pump.dismantleParts && pump.dismantleParts.map((part) => 
                                            <option >{part} </option>
                                        )}
                                    </select>
                                    {/* {<div className={btnClass}>Order </div>} */}
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default DismantledPumps