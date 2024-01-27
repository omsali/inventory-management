import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import { alertError, alertSuccess } from '../components/Alert';
import ViewDismantleModal from '../components/Modals/PumpModals/ViewDismantleModal';
import DismantleCard from '../components/PumpsCard/DismantleCard';

const DismantledPumps = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000',
    });

    const [pumps, setPumps] = useState([]);

    useEffect(() => {
        api.get('api/v1/getdismantlepumps').then((response) => {
            const pumpList = response.data.pumps;
            const dismantlePumps = pumpList.filter((pump) => {
                return pump.dismantleParts.length !== 0
            })
            setPumps(dismantlePumps);
            
            // console.log(response.data.pumps);
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

                <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 text-center w-fit mx-auto">{pumps.length}</div>

                {(pumps && pumps.length !== 0) &&
                    <div className='flex text-center'>
                        <div className='border-2 ml-4 w-[50px] p-4 border-sky-600'><b>Sr. no. </b></div>
                        <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-7`}>
                            <div className='border p-4 border-sky-600'><b>Pump Type </b></div>
                            <div className='border p-4 border-sky-600'><b>Pump Size </b></div>
                            <div className='border p-4 border-sky-600'><b>MOC </b></div>
                            <div className='border p-4 border-sky-600'><b>SO. NO </b></div>
                            <div className='border p-4 border-sky-600'><b>Sealing </b></div>
                            <div className='border p-4 border-sky-600'><b>Dismantled Parts </b></div>
                            <div className='border p-4 border-sky-600'><b>Opertaion </b></div>
                            {/* {<div className='border p-4 border-sky-600 '><b>Operations </b></div>} */}
                        </div>
                    </div>}
                {pumps &&
                    pumps.map((pump, index) => {
                        return (
                            <DismantleCard pump={pump} index={index} />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default DismantledPumps