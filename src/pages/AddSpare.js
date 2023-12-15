import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { alertSuccess } from '../components/Alert';
import { ToastContainer } from 'react-toastify';
import SpareNavbar from '../components/Navbar/SpareNavbar';

const AddSpare = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

    const [spares, setSpares] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    const [pumpType, setPumpType] = useState([]);
    const [pumpSize, setPumpSize] = useState([]);
    const [spareType, setSpareType] = useState([]);
    const [spareMOC, setSpareMOC] = useState([]);
    const [data, setData] = useState({
        selectedSize: '',
        selectedSpareType: '',
        selectedSpareMOC: '',
        QTY: '',
        price: '',
        invoice: '',
        invoiceDate: '',
    });

    useEffect(() => {
        api.get('api/v1/allspares').then((response) => {
            setSpares(response.data.spares);
        });
    }, []);

    const handleTypeChange = (event) => {
        const selectedID = event.target.value;
        setSelectedType(selectedID);

        const selectedPump = spares.find((spare) => spare._id === selectedID);

        if (selectedPump) {
            setPumpType(selectedPump.pumpType)
            setPumpSize(selectedPump.pumpSize)
            setSpareType(selectedPump.spareType)
            setSpareMOC(selectedPump.moc)
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleAddSpare = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/addspare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: pumpType,
                pumpSize: data.selectedSize,
                spareType: data.selectedSpareType,
                moc: data.selectedSpareMOC,
                qty: data.QTY,
                price: data.price,
                KSBInvoice: data.invoice,
                KSBInvoiceDate: data.invoiceDate
            })
        });
        alertSuccess("Spare Added Sucessfully")
        handleReset();
    }

    const handleReset = () => {
        setSelectedType('');
        setPumpSize([]);
        setSpareMOC([]);
        setSpareType([]);
        setData({
            selectedSize: '',
            selectedSpareType: '',
            selectedSpareMOC: '',
            QTY: '',
            price: '',
            invoice: '',
            invoiceDate: '',
        });
    }

    return (
        <div className=''>
            <SpareNavbar />
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-5xl text-zinc-900 italic'>Add Spare</div>
                <div className=' px-20'>
                    <div className=''>
                        <div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="PumpType">Pump Type: </label>
                                <select className={inputClass} id='PumpType' name='selectedType' onChange={handleTypeChange} value={selectedType}>
                                    <option value="">Select Pump Type</option>
                                    {spares.map((value) => (
                                        <option key={value._id} value={value._id}>
                                            {value.pumpType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="PumpSize">Pump Size: </label>
                                <select className={inputClass} id='PumpSize' name='selectedSize' onChange={handleInputChange} value={data.selectedSize}>
                                    <option value="">Select Pump Size</option>
                                    {pumpSize.map((value) => (
                                        <option key={value._id} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="Spare Type">Spare Type: </label>
                                <select className={inputClass} id='Spare Type' name='selectedSpareType' onChange={handleInputChange} value={data.selectedSpareType}>
                                    <option value="">Select Spare Type</option>
                                    {spareType.map((value) => (
                                        <option key={value._id} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="Spare Type">Spare MOC: </label>
                                <select className={inputClass} id='Spare MOC' name='selectedSpareMOC' onChange={handleInputChange} value={data.selectedSpareMOC}>
                                    <option value="">Select Spare MOC</option>
                                    {spareMOC.map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>

                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="QTY">Quantity: </label>
                                <input type="number" className={inputClass} placeholder='eg: 12' value={data.QTY} onChange={handleInputChange} name="QTY" id="qty" />
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="price">Price: </label>
                                <input type="number" className={inputClass} placeholder='eg: 1200' value={data.price} onChange={handleInputChange} name="price" id="price" />
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="invoice">KSB Invoice: </label>
                                <input type="text" className={inputClass} placeholder='eg: MH846535' value={data.invoice} onChange={handleInputChange} name="invoice" id="invoice" />
                            </div>
                            <div className='m-4 grid grid-cols-2'>
                                <label htmlFor="invoicedata">KSB Invoice Date: </label>
                                <input type="date" className={inputClass} value={data.invoiceDate} onChange={handleInputChange} name="invoiceDate" id="invoicedate" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center gap-8 my-4'>
                    <button className={btnClass} onClick={handleAddSpare}> Add Spare</button>
                    <button className={btnClass} onClick={handleReset}> Clear</button>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default AddSpare