import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ReportCard = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });

    const [CBPumps, setCBPumps] = useState([]);
    const [stockPumps, setStockPumps] = useState([]);
    const [dismantlePumps, setDismantlePumps] = useState([]);

    useEffect(() => {
        api.get('api/v1/getallpumpscust').then((response) => {
            setCBPumps(response.data.pumps);
            // console.log(response.data.pumps);
        });
        api.get('api/v1/getallpumps').then((response) => {
            setStockPumps(response.data.pumps);
            // console.log(response.data.pumps);
        });
        api.get('api/v1/getdismantlepumps').then((response) => {
            setDismantlePumps(response.data.pumps);
        });
    }, [])

    return (
        <div className='relative h-32 w-full mt-6 bg-sky-200 gap-14 text-zinc-900 text-lg font-bold italic z-10 border border-sky-300 rounded-xl'>
            <div className='flex justify-around m-5'>
                <div>
                    Pumps in Stock
                    <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md text-center w-fit mx-auto">{stockPumps && stockPumps.length}</div>
                </div>
                <div>
                    Pumps in CBS
                    <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md text-center w-fit mx-auto">{CBPumps && CBPumps.length}</div>
                </div>
                <div>
                    Pumps Dismantled
                    <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md text-center w-fit mx-auto">{dismantlePumps.length}</div>
                </div>
                <div className='text-center'>
                    Total Pumps
                    <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md text-center w-fit mx-auto">{stockPumps.length + CBPumps.length + dismantlePumps.length}</div>
                </div>
            </div>
        </div>
    )
}

export default ReportCard