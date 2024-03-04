import axios from 'axios';
import React, { useEffect, useState } from 'react'
import formatDate from '../../Utils/FormatDate';

const SparesOrderReceivedList = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 w-60'

    const [qtn, setQtn] = useState([])
    const [selectedRow, setSelectedRow] = useState(null);

    const fetchData = () => {
        api.get(`api/v1/getallsparesqtn`).then((response) => {
            const fetchedData = response.data.qtn
            setQtn(fetchedData);
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index); // Toggle selected row
    };

    // const handleSubmit = async (id) => {
    //     console.log(data);
    //     const response = await fetch("http://localhost:5000/api/v1/addremark", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             id: id,
    //             mailDate: data.mailDate,
    //             desc: data.desc,
    //             poDate: data.poDate,
    //             followup: data.followup,
    //             remark: data.remark

    //         })
    //     })
    // }

    return (
        <div className=''>
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-full mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-5xl text-zinc-900 italic'>Order Received List</div>

                <div className='flex mt-16'>
                    <div className='text-center text-lg font-medium border border-sky-700 p-2 w-24'> Sr. no.</div>
                    <div className='grid grid-cols-8 w-full'>
                        {/* <div className='text-center text-lg font-medium border border-sky-700 p-2'>Sr. no.</div> */}
                        <div className='text-center text-lg font-medium border border-sky-700'>Qtn no.</div>
                        <div className='text-center text-lg font-medium border border-sky-700'>Customer Name</div>
                        <div className='text-center text-lg font-medium border border-sky-700'>Date</div>
                        <div className='text-center text-lg font-medium border border-sky-700'>Contact Person</div>
                        <div className='text-center text-lg font-medium border border-sky-700'>Contact No.</div>
                        <div className='text-center text-lg font-medium border border-sky-700'>Pump Model</div>
                        <div className='text-center text-lg font-medium border border-sky-700'>Quantity</div>
                        {/* <div className='text-center text-lg font-medium border border-sky-700'>Unit</div> */}
                        <div className='text-center text-lg font-medium border border-sky-700'>Total Amount</div>
                    </div>
                </div>

                {(qtn) &&
                    qtn.map((q, index) =>
                        <React.Fragment key={index}>
                            <div className='flex' onClick={() => handleRowClick(index)}>
                                <div className='text-center text-lg font-medium border border-sky-700 p-2 w-24'>{index + 1} </div>
                                <div className='grid grid-cols-8 w-full'>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.qtnno}</div>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.custName}</div>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.date}</div>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.coPerson}</div>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.cono}</div>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.pumpModel}</div>
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.totalQty}</div>
                                    {/* <div className='text-center text-lg font-medium border border-sky-700'>Unit</div> */}
                                    <div className='text-center text-lg font-medium border border-sky-700'>{q.finalVal}</div>
                                </div>
                            </div>
                            {selectedRow === index && (
                                <div className='grid grid-cols-4 p-10 gap-x-10'>
                                    <div className='grid grid-cols-2 col-start-2'>
                                        <label className='fond-bold text-lg ' id=''>Mail send Date :</label>
                                        <div className=' text-lg font-medium '>{formatDate(q.mailDate)}</div>
                                    </div>
                                    <div className='grid grid-cols-2 col-start-3'>
                                        <label className='fond-bold text-lg ' id=''>Description :</label>
                                        <div className=' text-lg font-medium '>{q.desc}</div>
                                    </div>
                                    <div className='grid grid-cols-2 col-start-2'>
                                        <label className='fond-bold text-lg ' id=''>PO Received Date :</label>
                                        <div className=' text-lg font-medium '>{formatDate(q.poDate)}</div>
                                    </div>
                                    <div className='grid grid-cols-2 col-start-3'>
                                        <label className='fond-bold text-lg ' id=''>Follow up by :</label>
                                        <div className=' text-lg font-medium '>{q.followup}</div>
                                    </div>
                                    <div className='grid grid-cols-2 col-start-2'>
                                        <label className='fond-bold text-lg ' id=''>Remark :</label>
                                        <div className=' text-lg font-medium '>{q.remark}</div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    )}


            </div>
        </div>
    )
}

export default SparesOrderReceivedList
