import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import { alertSuccess } from '../components/Alert';
import { ToastContainer } from 'react-toastify';
import PumpCard from '../components/PumpsCard/PumpCard';
import Navbar from '../components/Navbar/Navbar';
// import ViewUpdateModal from '../components/Modals/ViewUpdateModal';

const AllPumps = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'


    const [pumps, setPumps] = useState([]);
    const [filteredPumps, setFilteredPumps] = useState([]);
    const [selectedPumpType, setSelectedPumpType] = useState('');
    const [selectedPumpSize, setSelectedPumpSize] = useState('');
    const [selectedPumpMOC, setSelectedPumpMOC] = useState('');

    const [stockPumps, setStockPumps] = useState([])
    const [filteredByType, setFilteredByType] = useState([])

    const [pumpType, setPumpType] = useState([]);
    const [pumpSize, setPumpSize] = useState([]);
    const [pumpMOC, setPumpMOC] = useState([]);

    useEffect(() => {
        api.get('api/v1/allpumps').then((response) => {
            setPumps(response.data.pumps);
            // setFilteredPumps(response.data.pumps);
        });
        api.get('api/v1/getallpumps').then((response) => {
            setStockPumps(response.data.pumps);
            setFilteredPumps(response.data.pumps);
        });
    }, []);


    const handleTypeChange = (event) => {
        const selectedPumpId = event.target.value;
        setSelectedPumpType(selectedPumpId);

        // Find the selected pump from the pumps array
        const selectedPumpT = pumps.find((pump) => pump._id === selectedPumpId);
        setPumpType(selectedPumpT);
        // Set the newQuantity state to the selected pump's quantity
        if (selectedPumpT) {
            setPumpSize(selectedPumpT.pumpSize)
            setPumpMOC(selectedPumpT.moc)
        } else {
            setPumpSize("size");
            setPumpMOC("moc");
        }
        const filterByType = stockPumps.filter((pump) => {
            return (
                (!selectedPumpT.pumpType || pump.pumpType === selectedPumpT.pumpType)
            )
        });
        setFilteredByType(filterByType)
        setFilteredPumps(filterByType);
    }
    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;
        setSelectedPumpSize(selectedSize);
        const filterBySize = filteredByType.filter((pump) => {
            return (
                (!selectedSize || pump.pumpSize === selectedSize)
            )
        });
        setFilteredPumps(filterBySize);

    }
    const handleMOCChange = (event) => {
        setSelectedPumpMOC(event.target.value);
        // const filterByMOC = filteredPumps.filter((pump) => {
        //     return (
        //         (!selectedPumpMOC || pump.moc === selectedPumpMOC)
        //     )
        // });
        // setFilteredPumps(filterByMOC);
    }

    const handleFilterPump = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/getpumps?pType=${pumpType.pumpType}&pSize=${selectedPumpSize}&pMOC=${selectedPumpMOC}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        setFilteredPumps(json)
    }

    const handleReset = () => {
        setSelectedPumpType('');
        setSelectedPumpSize([]);
        setSelectedPumpMOC([]);
        setFilteredPumps(stockPumps);
    }

    const handleDownloadCSV = () => {
        const a = document.createElement('a');
        a.href = 'http://localhost:5000/api/v1/download-csv';
        a.download = 'Instock-Pumps-[todays date].csv';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    return (
        <div className=''>
            <Navbar />
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Search and Dispatch</div>
                <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download All Pumps Data</button>
                <div className=' flex justify-center'>
                    {/* {console.log(filteredPumps)} */}
                    <div className='m-2'>
                        <label htmlFor="Pump Type">Pump Type: </label>
                        <select className={inputClass} id='Pump Type' onChange={handleTypeChange} value={selectedPumpType}>
                            <option value="">Select Pump Type</option>
                            {pumps.map((value) => (
                                <option key={value._id} value={value._id}>
                                    {value.pumpType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="Pump Type">Pump Size: </label>
                        <select className={inputClass} id='Pump Size' onChange={handleSizeChange} value={selectedPumpSize}>
                            <option value="">Select Pump Size</option>
                            {pumpSize.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="Pump Type">Pump MOC: </label>
                        <select className={inputClass} id='Pump MOC' onChange={handleMOCChange} value={selectedPumpMOC}>
                            <option value="">Select Pump MOC</option>
                            {pumpMOC.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex justify-center gap-8'>
                    <button className={btnClass} onClick={handleFilterPump}>Enquire</button>
                    <button className={btnClass} onClick={handleReset}> Clear</button>
                </div>
                {filteredPumps &&
                    <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 text-center w-fit mx-auto">{filteredPumps.length}</div>
                }
                <div className=' mx-4 border border-gray-500 rounded-md grid grid-cols-8'>
                    <div className='border p-4 border-sky-600'><b>Pump Type </b></div>
                    <div className='border p-4 border-sky-600'><b>Pump Size </b></div>
                    <div className='border p-4 border-sky-600'><b>MOC </b></div>
                    <div className='border p-4 border-sky-600'><b>So </b></div>
                    <div className='border p-4 border-sky-600'><b>KSB Invoice </b></div>
                    <div className='border p-4 border-sky-600'><b>KSB Invoice Data </b></div>
                    <div className='border p-4 border-sky-600'><b>Price </b></div>
                    <div className='border p-4 border-sky-600'><b>Operations </b></div>
                </div>
                {filteredPumps &&
                    filteredPumps.map((pump) => {
                        return <PumpCard pump={pump} handleFilterPump={handleFilterPump} />
                    })}

            </div>
            <ToastContainer />
        </div>
    )
}

export default AllPumps