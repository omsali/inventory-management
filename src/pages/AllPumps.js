import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import PumpCard from '../components/PumpsCard/PumpCard';
import Navbar from '../components/Navbar/Navbar';
import { alertError, alertSuccess } from '../components/Alert';

const AllPumps = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000',
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'


    const [pumps, setPumps] = useState([]);
    const [filteredPumps, setFilteredPumps] = useState([]);
    const [selectedPumpType, setSelectedPumpType] = useState('');
    const [selectedPumpID, setSelectedPumpID] = useState('');
    const [selectedPumpSize, setSelectedPumpSize] = useState('');
    const [selectedPumpMOC, setSelectedPumpMOC] = useState('');
    const [soNo, setSoNo] = useState('');

    const [stockPumps, setStockPumps] = useState([])
    const [filteredByType, setFilteredByType] = useState([]);
    const [filteredBySize, setFilteredBySize] = useState([]);

    const [pumpType, setPumpType] = useState([]);
    const [pumpSize, setPumpSize] = useState([]);
    const [pumpMOC, setPumpMOC] = useState([]);

    useEffect(() => {
        api.get('api/v1/allpumps').then((response) => {
            setPumps(response.data.pumps);
        });
        api.get('api/v1/getallpumps').then((response) => {
            setStockPumps(response.data.pumps);
            setFilteredPumps(response.data.pumps);
            setFilteredByType(response.data.pumps);
        });
    }, []);

    let admin = false;

    if (localStorage.getItem("token").includes("Admin")) {
        admin = true;
    }


    const handleTypeChange = (event) => {
        const id = event.target.value;
        setSelectedPumpID(id);

        const selectedPumpT = pumps.find((pump) => pump._id === id);
        setPumpType(selectedPumpT);
        setSelectedPumpType(selectedPumpT.pumpType);
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
        setFilteredBySize(filterBySize);
        setFilteredPumps(filterBySize);

    }
    const handleMOCChange = (event) => {
        const selectedMOC = event.target.value
        setSelectedPumpMOC(selectedMOC);
        const filterByMOC = filteredBySize.filter((pump) => {
            return (
                (!selectedMOC || pump.moc === selectedMOC)
            )
        });
        setFilteredPumps(filterByMOC);
    }

    const handleSoChange = (event) => {
        const so = event.target.value;
        setSoNo(so);
        const filterBySo = stockPumps.filter((pump) => {
            return (
                (!so || pump.so.includes(so))
            )
        });
        setFilteredPumps(filterBySo);
    }

    const handleFilterPump = async () => {
        let allPumps = [];
        api.get('api/v1/getallpumps').then((response) => {
            allPumps = response.data.pumps;
            setStockPumps(response.data.pumps);
            const filterByPara = allPumps.filter((pump) => {
                return (
                    (!selectedPumpType || pump.pumpType === selectedPumpType) &&
                    (!selectedPumpSize || pump.pumpSize === selectedPumpSize) &&
                    (!selectedPumpMOC || pump.moc === selectedPumpMOC)
                )
            });
            setFilteredPumps(filterByPara);
        });
    }

    const handleReset = () => {

        setFilteredPumps(stockPumps);
        setSelectedPumpID('');
        setSelectedPumpType('');
        setSelectedPumpSize('');
        setSelectedPumpMOC('');
        setSoNo('');
    }

    const handleOrderList = async () => {

        // if (selectedPumpType && selectedPumpSize && selectedPumpMOC){
        //     const response = await fetch('http//localhost:5000/api/vi/addtoorderlist', {
        //                 method: "POST",
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({
        //                     pumpType: selectedPumpType,
        //                     pumpSize: selectedPumpSize,
        //                     moc: selectedPumpMOC,
        //                 })
        //             });
        //             if(response.status === 201){
        //                 alertSuccess("Pump added to Order list")
        //             } else {
        //                 alertError("Failed to add to Order list")
        //             }
        // } else { alertError("Select All fields")}      

        if (selectedPumpType) {
            if (selectedPumpSize) {
                if (selectedPumpMOC) {
                    const response = await fetch('http://localhost:5000/api/v1/addtoorderlist', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pumpType: selectedPumpType,
                            pumpSize: selectedPumpSize,
                            moc: selectedPumpMOC,
                        })
                    });
                    if(response.status === 201){
                        alertSuccess("Pump added to Order list")
                    } else {
                        alertError("Failed to add to Order list")
                    }
                } else { alertError("Select Pump MOC") }
            } else { alertError("Select Pump Size") }
        } else { alertError("Select Pump Type") }
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
                <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Stock</div>
                <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download All Pumps Data</button>
                <div className=' flex justify-center'>
                    {/* {console.log(filteredPumps)} */}
                    <div className='m-2'>
                        <label htmlFor="Pump Type">Pump Type: </label>
                        <select className={inputClass} id='Pump Type' onChange={handleTypeChange} value={selectedPumpID}>
                            <option value="">Select Pump Type</option>
                            {pumps.map((value) => (
                                <option key={value._id} value={value._id}>
                                    {value.pumpType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="Pump Size">Pump Size: </label>
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
                        <label htmlFor="Pump MOC">Pump MOC: </label>
                        <select className={inputClass} id='Pump MOC' onChange={handleMOCChange} value={selectedPumpMOC}>
                            <option value="">Select Pump MOC</option>
                            {pumpMOC.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="SO. NO.">SO. NO.: </label>
                        <input type="text"
                            id='SO. NO.'
                            value={soNo}
                            placeholder='eg: 0000000000/000/0'
                            onChange={handleSoChange}
                            className={inputClass} />
                    </div>
                </div>
                <div className='flex justify-center gap-8'>
                    {/* <button className={btnClass} onClick={handleFilterPump}>Enquire</button> */}
                    <button className={btnClass} onClick={handleReset}> Clear</button>
                </div>
                <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 text-center w-fit mx-auto">{filteredPumps.length}</div>

                {filteredPumps.length === 0 &&
                    <div className='flex justify-center gap-8'>
                        <button className={btnClass} onClick={handleOrderList}> Add to Order List</button>
                    </div>}

                {(filteredPumps && filteredPumps.length !== 0) &&
                    <div className='flex'>
                        <div className='border-2 ml-4 w-[50px] p-4 border-sky-600'><b>Sr. no. </b></div>
                        <div className={`mr-4 w-full border border-gray-500 rounded-md grid ${(admin) ? "grid-cols-9" : "grid-cols-8"}`}>
                            <div className='border p-4 border-sky-600'><b>Pump Type </b></div>
                            <div className='border p-4 border-sky-600'><b>Pump Size </b></div>
                            <div className='border p-4 border-sky-600'><b>MOC </b></div>
                            <div className='border p-4 border-sky-600'><b>So </b></div>
                            <div className='border p-4 border-sky-600'><b>Sealing </b></div>
                            <div className='border p-4 border-sky-600'><b>KSB Invoice </b></div>
                            <div className='border p-4 border-sky-600'><b>KSB Invoice Data </b></div>
                            <div className='border p-4 border-sky-600'><b>Price </b></div>
                            {admin && <div className='border p-4 border-sky-600'><b>Operations </b></div>}
                        </div>
                    </div>}
                {filteredPumps &&
                    filteredPumps.map((pump, index) => {
                        return <PumpCard pump={pump} handleFilterPump={handleFilterPump} admin={admin} index={index} />
                    })}

            </div>
        </div>
    )
}

export default AllPumps