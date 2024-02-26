import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const EnquiryPage = () => {
    const navigate = useNavigate();

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 w-60'


    return (
        <div className=''>
            {/* {console.log(pumpTypes)} */}
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto mt-60 bg-sky-300'>
                <div className='my-4 text-center font-bold text-5xl text-zinc-900 italic'>Enquiry Register</div>
                <div className='flex justify-center align-middle my-16'>
                    <div
                        className={btnClass}
                        onClick={() => navigate("/pumpsenquiry")}
                    >
                        <div>Pumps</div>
                    </div> 
                    <div
                        className={btnClass}
                        onClick={() => navigate("/sparesenquiry")}
                    >
                        <div>Spares</div>
                    </div>
                </div>
                {/* <div className=' px-20'>
                <div className=''>
                    
                    <div>

                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="quono" className='text-lg font-medium pt-4'>Quotation NO: </label>
                            <input type="text" className={inputClass} placeholder='111111-1' value={data.quono} onChange={handleInputChange} name="quono" id="quono" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="date" className='text-lg font-medium pt-4'>Date: </label>
                            <input type="date" className={inputClass} placeholder='' value={data.date} onChange={handleInputChange} name="date" id="date" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="custName" className='text-lg font-medium pt-4'>Cusomer Name: </label>
                            <input type="text" className={inputClass} placeholder='John Deo' value={data.custName} onChange={handleInputChange} name="custName" id="custName" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="pumpType" className='text-lg font-medium pt-4'>Pump Types: </label>
                            <input type="text" className={inputClass} placeholder='' value={data.pumpType} onChange={handleInputChange} name="pumpType" id="pumpType" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="serviceType" className='text-lg font-medium pt-4'>Spares/ Services/ Sub.Pump/ Pump: </label>
                            <input type="text" className={inputClass} value={data.serviceType} onChange={handleInputChange} name="serviceType" id="serviceType" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="qty" className='text-lg font-medium pt-4'>Quantity: </label>
                            <input type="number" className={inputClass} placeholder='00' value={data.qty} onChange={handleInputChange} name="qty" id="qty" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="totalVal" className='text-lg font-medium pt-4'>Total Value: </label>
                            <input type="number" className={inputClass} placeholder='9999' value={data.totalVal} onChange={handleInputChange} name="totalVal" id="totalVal" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="coPerson" className='text-lg font-medium pt-4'>Contact Person: </label>
                            <input type="text" className={inputClass} placeholder='John Deo' value={data.coPerson} onChange={handleInputChange} name="coPerson" id="coPerson" />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="cono" className='text-lg font-medium pt-4'>Contact No: </label>
                            <input type="number" className={inputClass} placeholder='9999999999' value={data.cono} onChange={handleInputChange} name="cono" id="cono" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-8 my-4'>
                <button className={btnClass} onClick={handleAddEnquiry}> Add Enquiry</button>
                <button className={btnClass} onClick={handleReset}> Clear</button>
            </div> */}
            </div>
        </div >
    )
}

export default EnquiryPage