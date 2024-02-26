import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import MOUCard from '../components/MOUCard/MOUCard';

const MOU = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000',
    });

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

    const [mouData, setMouData] = useState([])
    const [editMode, setEditMode] = useState(false);

    const f = () => {
        api.get('api/v1/getmou').then((response) => {
            setMouData(response.data.pumpTypes);
            // console.log(response.data.pumpTypes);
        });
    }

    useEffect(() => {
        f();
    }, [])

    const addMOU = async () => {
        const response = fetch(`http://localhost:5000/api/v1/addmou`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: "",
                totalQty: 0,
                quarters: [
                    {
                        quarterNumber: 1,
                        quarterTarget: 0,
                        quarterSellQty: 0
                    },
                    {
                        quarterNumber: 2,
                        quarterTarget: 0,
                        quarterSellQty: 0
                    },
                    {
                        quarterNumber: 3,
                        quarterTarget: 0,
                        quarterSellQty: 0
                    },
                    {
                        quarterNumber: 4,
                        quarterTarget: 0,
                        quarterSellQty: 0
                    }
                ]

            })
        });
        f();
    }



    return (
        <div className=''>
            <Navbar />
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>MOU</div>
                <button className={`${btnClass} absolute right-5 top-20`} onClick={() => setEditMode(!editMode)}>{(editMode) ? "Done" : "Edit"}</button>

                {editMode && <button className={`${btnClass} absolute right-28 top-20`} onClick={addMOU}>Add</button>}

                {console.log(mouData)}
                <div className='flex'>
                    {(editMode) && <div className='border border-sky-700 w-20 text-center align-middle'>
                        Edit
                    </div>}
                    <div className='grid grid-rows-2 w-full'>
                        <div className='grid grid-cols-6 text-center'>
                            <div className='text-center border border-sky-700 rounded-sm'>Pump Name</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Target</div>
                            <div className='text-center border border-sky-700 rounded-sm'>First </div>
                            <div className='text-center border border-sky-700 rounded-sm'>Second</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Third</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Fourth</div>
                        </div>
                        <div className='grid grid-cols-12 text-center'>
                            <div className='text-center border border-sky-700 rounded-sm col-span-2'>Pump Name</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Target</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Sell</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Target</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Sell</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Target</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Sell</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Target</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Sell</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Target</div>
                            <div className='text-center border border-sky-700 rounded-sm'>Sell</div>
                        </div>
                    </div>
                </div>

                {mouData &&
                    mouData.map((mou) => {
                        return <MOUCard mou={mou} edit={editMode} f={f}/>
                    })}




            </div>
        </div>
    );

}

export default MOU