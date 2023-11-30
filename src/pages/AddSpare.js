import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { alertSuccess } from '../components/Alert';
import { ToastContainer } from 'react-toastify';

const AddSpare = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

    const pumpType = "ETN";

    const [spares, setSpares] = useState([]);
    const [selectedSpareType, setSelectedSpareType] = useState('');
    const [selectedSpareSize, setSelectedSpareSize] = useState('');
    const [selectedSpareMOC, setSelectedSpareMOC] = useState('');

    const [spareType, setSpareType] = useState([]);
    const [spareSize, setSpareSize] = useState([]);
    const [spareMOC, setSpareMOC] = useState([]);
    const [inwardQty, setInwardQty] = useState('');
    const [inwardCust, setInwardCust] = useState('');
    const [outwardQty, setOutwardQty] = useState('');
    const [outwardCust, setOutwardCust] = useState('');

    useEffect(() => {
        api.get('api/v1/allspares').then((response) => {
            // console.log(response.data);
            setSpares(response.data.spares);
        });
    }, []);

    const handleTypeChange = (event) => {
        const selectedSpareId = event.target.value;
        setSelectedSpareType(selectedSpareId);

        const selectedSpareT = spares.find((spare) => spare._id === selectedSpareId);
        setSpareType(selectedSpareT);
        // console.log(selectedPumpT);
        if (selectedSpareT) {
            setSpareSize(selectedSpareT.spareSize)
            setSpareMOC(selectedSpareT.moc)
        } else {
            // setPumpSize(size);
            // setPumpMOC(moc);
        }
    }

    const handleSizeChange = (event) => {
        setSelectedSpareSize(event.target.value);

    }
    const handleMOCChange = (event) => {
        setSelectedSpareMOC(event.target.value);
    }
    const handleInwardQtyChange = (event) => {
        setInwardQty(event.target.value);
    }
    const handleInwardCustChange = (event) => {
        setInwardCust(event.target.value);
    }
    const handleOutwardQtyChange = (event) => {
        setOutwardQty(event.target.value);
    }
    const handleOutwardCustChange = (event) => {
        setOutwardCust(event.target.value);
    }

    const handleAddSpare = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/addspare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: pumpType,
                spareType: spareType.spareType,
                spareSize: selectedSpareSize,
                moc: selectedSpareMOC,
                inwardQty: inwardQty,
                inwardCust: inwardCust,
                outwardQty: outwardQty,
                outwardCust: outwardCust
            })
        });
        alertSuccess("Spare Added Sucessfully")
        handleReset();
    }

    const handleReset = () => {
        setSelectedSpareType('');
        setSelectedSpareSize([]);
        setSelectedSpareMOC([]);
        setInwardQty('');
        setInwardCust('');
        setOutwardQty('');
        setOutwardCust('');
    }

    return (
        <div className='bg-zinc-900 border border-black h-screen shadow-xl'>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-6/12 mx-auto my-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-5xl text-zinc-900 italic'>Add Spare</div>
                <div className=' pl-40'>
                    <div className='m-2'>
                        <label htmlFor="Spare Type">Spare Type: </label>
                        <select className={inputClass} id='Spare Type' onChange={handleTypeChange} value={selectedSpareType}>
                            <option value="">Select Spare Type</option>
                            {spares.map((value) => (
                                <option key={value._id} value={value._id}>
                                    {value.spareType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="Spare Type">Spare Size: </label>
                        <select className={inputClass} id='Spare Size' onChange={handleSizeChange} value={selectedSpareSize}>
                            <option value="">Select Spare Size</option>
                            {spareSize.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="Spare Type">Spare MOC: </label>
                        <select className={inputClass} id='Spare MOC' onChange={handleMOCChange} value={selectedSpareMOC}>
                            <option value="">Select Spare MOC</option>
                            {spareMOC.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mx-2 '>
                        <label htmlFor="inwardQty">Recieved Quantity: </label>
                        <input type="number" value={inwardQty} onChange={handleInwardQtyChange} className={inputClass} />
                    </div>
                    <div className='mx-2 '>
                        <label htmlFor="inwardCust"> Customer Name: </label>
                        <input type="text" value={inwardCust} onChange={handleInwardCustChange} className={inputClass} />
                    </div>
                    <div className='mx-2 '>
                        <label htmlFor="outwardQty">Dispatch Quantity: </label>
                        <input type="number" value={outwardQty} onChange={handleOutwardQtyChange} className={inputClass} />
                    </div>
                    <div className='mx-2 '>
                        <label htmlFor="outwardCust">Customer Name: </label>
                        <input type="text" value={outwardCust} onChange={handleOutwardCustChange} className={inputClass} />
                    </div>
                </div>
                <div className='flex justify-center gap-8 my-4'>
                    <button className={btnClass} onClick={handleAddSpare}> Add Spare</button>
                    <button className={btnClass} onClick={handleReset}> Clear</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddSpare