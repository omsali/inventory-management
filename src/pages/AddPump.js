import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import Dropdown from '../components/Dropdown';
import { alertError, alertSuccess } from "../components/Alert";
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';

const AddPump = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md'

    const [pumps, setPumps] = useState([]);
    const [selectedPumpType, setSelectedPumpType] = useState('');
    const [selectedPumpSize, setSelectedPumpSize] = useState('');
    const [selectedPumpMOC, setSelectedPumpMOC] = useState('');

    const [pumpType, setPumpType] = useState([]);
    const [pumpSize, setPumpSize] = useState([]);
    const [pumpMOC, setPumpMOC] = useState([]);
    const [so, setSo] = useState('');
    const [desc, setDesc] = useState('');
    const [seal, setSeal] = useState('');
    const [price, setPrice] = useState('');
    const [invoice, setInvoice] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');

    const [ETA, setETA] = useState(false)

    useEffect(() => {
        api.get('api/v1/allpumps').then((response) => {
            setPumps(response.data.pumps);
            // console.log(response.data);
        });
    }, []);

    const handleTypeChange = (event) => {
        const selectedPumpId = event.target.value;
        setSelectedPumpType(selectedPumpId);

        const selectedPumpT = pumps.find((pump) => pump._id === selectedPumpId);
        setPumpType(selectedPumpT);
        // console.log(selectedPumpT);
        if (selectedPumpT) {
            setPumpSize(selectedPumpT.pumpSize)
            setPumpMOC(selectedPumpT.moc)
        } else {
            alertError("Failed to fetch, Please Refresh");
        }

        setETA(selectedPumpT.pumpType);
        // if(selectedPumpT.pumpType === 'ETABLOC'){
        //     setETA(true);
        // }
    }

    const handleSizeChange = (event) => {
        setSelectedPumpSize(event.target.value);
    }
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }
    const handleMOCChange = (event) => {
        setSelectedPumpMOC(event.target.value);
    }
    const handleSoChange = (event) => {
        setSo(event.target.value);
    }
    const handleSealChange = (event) => {
        setSeal(event.target.value);
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    const handleInvoiceChange = (event) => {
        setInvoice(event.target.value);
    }
    const handleInvoiceDateChange = (event) => {
        setInvoiceDate(event.target.value);
    }

    const handleReset = () => {
        setSelectedPumpType('');
        setSelectedPumpSize([]);
        setSelectedPumpMOC([]);
        setDesc('');
        setSo('');
        setSeal('');
        setPrice('');
        setInvoice('');
        setInvoiceDate('');
    }

    const handleAddPump = async () => {
        if (pumpType.pumpType && selectedPumpSize && selectedPumpMOC && so && price && invoice && invoiceDate) {
            const response = await fetch(`http://localhost:5000/api/v1/addpump`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pumpType: pumpType.pumpType,
                    pumpSize: selectedPumpSize,
                    moc: selectedPumpMOC,
                    so: so,
                    seal: seal,
                    price: price,
                    KSBInvoice: invoice,
                    KSBInvoiceDate: invoiceDate
                })
            });
            // toast.success("Pump Added Sucessfully",{theme: "colored"});
            if (response.status === 400) {
                alertError(`Pump with So no: ${so} already exists`);
            } else {
                alertSuccess("Pump Added Sucessfully");
            }
            handleReset();
        } else {
            alertError("All fields are required")
        }
    }

    return (
        <div className='relative'>
            <div className=' bg-zinc-900 border border-black h-full shadow-xl'>
            <Navbar />
                <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-8 bg-sky-300'>
                    <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Add Pump</div>
                    <div className='px-20 '>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="Pump Type" className='text-lg font-medium'>Pump Type: </label>
                            <select className={inputClass} id='Pump Type' onChange={handleTypeChange} value={selectedPumpType}>
                                <option value="">Select Pump Type</option>
                                {pumps.map((value) => (
                                    <option key={value._id} value={value._id}>
                                        {value.pumpType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="Pump Type" className='text-lg font-medium'>Pump Size: </label>
                            <select className={inputClass} id='Pump Size' onChange={handleSizeChange} value={selectedPumpSize}>
                                <option value="">Select Pump Size</option>
                                {pumpSize.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {console.log(ETA)}
                        {ETA && <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="description" className='text-lg font-medium'>Description: </label>
                            <input type="text"
                                value={desc}
                                onChange={handleDescChange}
                                className={inputClass} />
                        </div>}
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="Pump Type" className='text-lg font-medium'>Pump MOC: </label>
                            <select className={inputClass} id='Pump MOC' onChange={handleMOCChange} value={selectedPumpMOC}>
                                <option value="">Select Pump MOC</option>
                                {pumpMOC.map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="sealing" className='text-lg font-medium'>Sealing: </label>
                            <select className={inputClass} id='Pump Size' onChange={handleSealChange} value={seal}>
                                <option value="">Select Sealing type</option>
                                <option value="Gland Pack">Gland Pack</option>
                                <option value="Sealed">Sealed</option>

                            </select>
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="so" className='text-lg font-medium'>So. no: </label>
                            <input type="text"
                                value={so}
                                placeholder='eg: 0000000000/000/0'
                                onChange={handleSoChange}
                                className={inputClass} />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="ksbinvoice" className='text-lg font-medium'>KSB Invoice: </label>
                            <input type="text"
                                value={invoice}
                                placeholder='eg. 123456789'
                                onChange={handleInvoiceChange}
                                className={inputClass} />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="invoicedate" className='text-lg font-medium'>KSB Invoice Date: </label>
                            <input type="date"
                                value={invoiceDate}
                                onChange={handleInvoiceDateChange}
                                className={inputClass} />
                        </div>
                        <div className='m-4 grid grid-cols-2'>
                            <label htmlFor="price" className='text-lg font-medium'> Price: </label>
                            <input type="number"
                                value={price}
                                placeholder='eg. 10,000'
                                onChange={handlePriceChange}
                                className={inputClass} />
                        </div>
                    </div>
                    <div className='flex justify-center gap-8'>
                        <button className={btnClass} onClick={handleAddPump}> Add Pump</button>
                        <button className={btnClass} onClick={handleReset}> Clear</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AddPump