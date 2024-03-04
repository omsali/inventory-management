import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { alertError, alertSuccess } from '../../components/Alert';
import { ToastContainer } from 'react-toastify';
import BearingNavbar from '../../components/Navbar/BearingNavbar'

const AddBearing = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 w-60'

    const [allBearings, setAllBearings] = useState([]);
    const [selectedType, setSelectedType] = useState('')
    const [bearingType, setBearingType] = useState('')
    const [bearings, setBearings] = useState([]);

    const [data, setData] = useState({
        bearing: '',
        so: '',
        price: '',
        invoice: '',
        invoiceDate: '',
    });

    useEffect(() => {
        api.get('api/v1/allbearings').then((response) => {
            setAllBearings(response.data.bearings);
        });
    }, []);

    const handleTypeChange = (event) => {
        const selectedID = event.target.value;
        setSelectedType(selectedID);

        const selectedBearing = allBearings.find((bearing) => bearing._id === selectedID);
        if (selectedBearing) {
            setBearingType(selectedBearing.bearingType)
            setBearings(selectedBearing.bearings)
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleAddBearing = async () => {
        if (selectedType) {

            const response = await fetch(`http://localhost:5000/api/v1/addbearing`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bearingType: bearingType,
                    bearing: data.bearing,
                    so: data.so,
                    price: data.price,
                    KSBInvoice: data.invoice,
                    KSBInvoiceDate: data.invoiceDate
                })
            });
            alertSuccess("Bearing Added Sucessfully")
            handleReset();
        } else {
            alertError("All fields are required")
        }
    }

    const handleReset = () => {
        setSelectedType('');
        setBearings([])
        setData({
            bearing: '',
            so: '',
            price: '',
            invoice: '',
            invoiceDate: '',
        });
    }

    return (
        <div className=''>
        <BearingNavbar />
            {/* {console.log(pumpTypes)} */}
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-5xl text-zinc-900 italic'>Add Bearing</div>
                <div className=' px-20'>
                    <div className=''>
                        <div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="bearingType" className='text-lg font-medium pt-4'>Bearing Type: </label>
                                <select className={inputClass} id='bearingType' name='bearingType' onChange={handleTypeChange} value={selectedType}>
                                    <option value="">Select Bearing Type</option>
                                    {allBearings.map((value) => (
                                        <option key={value._id} value={value._id}>
                                            {value.bearingType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="bearing" className='text-lg font-medium pt-4'>Select Bearing: </label>
                                <select className={inputClass} id='bearing' name='bearing' onChange={handleInputChange} value={data.bearing}>
                                    <option value="">Select Bearing</option>
                                    {bearings.map((value) => (
                                        <option key={value._id} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>

                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="so" className='text-lg font-medium pt-4'>SO NO: </label>
                                <input type="text" className={inputClass} placeholder='eg: 123456/1223/12' value={data.so} onChange={handleInputChange} name="so" id="so" />
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="price" className='text-lg font-medium pt-4'>Price: </label>
                                <input type="number" className={inputClass} placeholder='eg: 1200' value={data.price} onChange={handleInputChange} name="price" id="price" />
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="invoice" className='text-lg font-medium pt-4'>KSB Invoice: </label>
                                <input type="text" className={inputClass} placeholder='eg: MH846535' value={data.invoice} onChange={handleInputChange} name="invoice" id="invoice" />
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="invoicedata" className='text-lg font-medium pt-4'>KSB Invoice Date: </label>
                                <input type="date" className={inputClass} value={data.invoiceDate} onChange={handleInputChange} name="invoiceDate" id="invoicedate" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-8 my-4'>
                    <button className={btnClass} onClick={handleAddBearing}> Add Bearing</button>
                    <button className={btnClass} onClick={handleReset}> Clear</button>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default AddBearing
