import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AllSpareQtn = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 w-60'

    const [qtn, setQtn] = useState([])
    const [follow, setFollow] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState({
        mailDate: "",
        desc: "",
        poDate: "",
        followup: "",
        remark: ""
    })

    useEffect(() => {
        api.get(`api/v1/getallsparesqtn`).then((response) => {
            const fetchedData = response.data.qtn
            setQtn(fetchedData);
            setData({
                mailDate: fetchedData.mailDate,
                desc: fetchedData.desc,
                poDate: fetchedData.poDate,
                followup: fetchedData.followup,
                remark: fetchedData.remark
            })
        });
    }, [])

    const handleInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index); // Toggle selected row
    };

    const handleSubmit = async (index) => {
        const response = await fetch("http://localhost:5000/api/v1/addremark", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mailDate: data.mailDate,
                desc: data.desc,
                poDate: data.poDate,
                followup: data.followup,
                remark: data.remark

            })
        })
    }

    return (
        <div className=''>
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-full mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-5xl text-zinc-900 italic'>Quotation List</div>

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
                                <div className='grid grid-cols-2 p-10'>
                                    <div className=' grid grid-cols-3'>
                                        <label htmlFor="mailDate" className='text-lg font-medium pt-4'>Mail Sent Date: </label>
                                        <input type="date" className={inputClass} onChange={handleInputChange} value={data.mailDate} name='mailDate' id='mailDate' placeholder="Mail Sent Date" />
                                    </div>
                                    <div className=' grid grid-cols-3'>
                                        <label htmlFor="desc" className='text-lg font-medium pt-4'>Description: </label>
                                        <input type="text" className={inputClass} onChange={handleInputChange} value={data.desc} name='desc' id='desc' placeholder="Description" />
                                    </div>
                                    <div className=' grid grid-cols-3'>
                                        <label htmlFor="followup" className='text-lg font-medium pt-4'>Follow Up: </label>
                                        <input type="text" className={inputClass} onChange={handleInputChange} value={data.followup} name='followup' id='followup' placeholder="Follow Up Message" />
                                    </div>
                                    <div className=' grid grid-cols-3'>
                                        <label htmlFor="poDate" className='text-lg font-medium pt-4'>PO Date: </label>
                                        <input type="date" className={inputClass} onChange={handleInputChange} value={data.poDate} name='poDate' id='poDate' placeholder="Purchase Order Date" />
                                    </div>
                                    <div className=' grid grid-cols-3'>
                                        <label htmlFor="remark" className='text-lg font-medium pt-4'>Remark: </label>
                                        <input type="text" className={inputClass} onChange={handleInputChange} value={data.remark} name='remark' id='remark' placeholder="Remark" />
                                    </div>
                                    <div className={`${btnClass} w-fit`} onClick={() => handleSubmit(index)}>Submit</div>
                                    {/* Add more input fields as needed */}
                                </div>
                            )}
                        </React.Fragment>
                    )}


            </div>
        </div>
    )
}

export default AllSpareQtn