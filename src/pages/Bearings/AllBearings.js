import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import BearingCard from '../../components/BearingCard/BearingCard';
import BearingNavbar from '../../components/Navbar/BearingNavbar';

const AllBearings = () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000',
    });
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

    const [bearings, setBearings] = useState([]);
    const [stockBearings, setStockBearings] = useState([]);
    const [filteredBearings, setfilteredBearings] = useState([]);
    const [filteredByType, setFilteredByType] = useState([]);
    const [selectedBearingID, setSelectedBearingID] = useState([]);
    // const [selectedBearing, setSelectedBearing] = useState([]);
    const [bearingsByType, setBearingsByType] = useState([]);

    const [data, setData] = useState({
        selectedBearingType: '',
        selectedBearing: '',
        so: '',
    })

    useEffect(() => {
        api.get('api/v1/allbearings').then((response) => {
            setBearings(response.data.bearings);
        });
        api.get('api/v1/getallbearings').then((response) => {
            setStockBearings(response.data.bearing);
            setfilteredBearings(response.data.bearing);
            setFilteredByType(response.data.bearings);
        });
    }, []);

    let admin = false;

    if (localStorage.getItem("token").includes("Admin")) {
        admin = true;
    }


    const handleTypeChange = (event) => {
        const id = event.target.value;
        setSelectedBearingID(id);

        const selectedBearing = bearings.find((bearing) => bearing._id === id);
        setData({...data, selectedBearingType: selectedBearing.bearingType })
        if (selectedBearing) {
            setBearingsByType(selectedBearing.bearings)
        }
        const filterByType = stockBearings.filter((bearing) => {
            return (
                (!selectedBearing.bearingType || bearing.bearingType === selectedBearing.bearingType)
            )
        });
        setFilteredByType(filterByType)
        setfilteredBearings(filterByType);
    }

    const handleBearingChange = (event) => {
        const selectedBearing = event.target.value;
        setData({...data, [event.target.name]: event.target.value });

        const filterByBearing = filteredByType.filter((bearing) => {
            return (
                (!selectedBearing || bearing.bearing === selectedBearing)
            )
        });
        setfilteredBearings(filterByBearing);

    }

    const handleSoChange = (event) => {
        const so = event.target.value;
        setData({...data, [event.target.name]: event.target.value });
        const filterBySo = stockBearings.filter((bearing) => {
            return (
                (!so || bearing.so.includes(so))
            )
        });
        setfilteredBearings(filterBySo);
    }

    const handleFilterBearing = async () => {
        let allbearings = [];
        api.get('api/v1/getallbearings').then((response) => {
            allbearings = response.data.bearing;
            setStockBearings(response.data.bearing);
            const filterByPara = allbearings.filter((bearing) => {
                return (
                    (!data.selectedBearingType || bearing.pumpType === data.selectedBearingType) 
                )
            });
            setfilteredBearings(filterByPara);
        });
    }

    const handleReset = () => {

        setfilteredBearings(stockBearings);
        setSelectedBearingID('');
        setData({
            selectedBearingType: '',
            selectedBearing: '',
            so: '', 
        })
    }

    // const handleOrderList = async () => {

    //     // if (selectedPumpType && selectedbearingsize && selectedPumpMOC){
    //     //     const response = await fetch('http//localhost:5000/api/vi/addtoorderlist', {
    //     //                 method: "POST",
    //     //                 headers: {
    //     //                     'Content-Type': 'application/json',
    //     //                 },
    //     //                 body: JSON.stringify({
    //     //                     pumpType: selectedPumpType,
    //     //                     bearingsize: selectedbearingsize,
    //     //                     moc: selectedPumpMOC,
    //     //                 })
    //     //             });
    //     //             if(response.status === 201){
    //     //                 alertSuccess("Pump added to Order list")
    //     //             } else {
    //     //                 alertError("Failed to add to Order list")
    //     //             }
    //     // } else { alertError("Select All fields")}      

    //     if (selectedPumpType) {
    //         if (selectedbearingsize) {
    //             if (selectedPumpMOC) {
    //                 const response = await fetch('http://localhost:5000/api/v1/addtoorderlist', {
    //                     method: "POST",
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         pumpType: selectedPumpType,
    //                         bearingsize: selectedbearingsize,
    //                         moc: selectedPumpMOC,
    //                     })
    //                 });
    //                 if (response.status === 201) {
    //                     alertSuccess("Pump added to Order list")
    //                 } else {
    //                     alertError("Failed to add to Order list")
    //                 }
    //             } else { alertError("Select Pump MOC") }
    //         } else { alertError("Select Pump Size") }
    //     } else { alertError("Select Pump Type") }
    // }

    const handleDownloadCSV = () => {
        const a = document.createElement('a');
        a.href = 'http://localhost:5000/api/v1/downloadB-csv';
        a.download = 'Instock-bearings-[todays date].csv';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    return (
        <div className=''>
            <BearingNavbar />
            <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
            <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
                <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Stock</div>
                <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download All bearings Data</button>
                <div className=' flex justify-center'>
                    {/* {console.log(filteredBearings)} */}
                    <div className='m-2'>
                        <label htmlFor="Bearing Type">Bearing Type: </label>
                        <select className={`${inputClass} w-60`} id='Bearing Type' onChange={handleTypeChange} value={selectedBearingID}>
                            <option value="">Select Bearing Type</option>
                            {bearings.map((value) => (
                                <option key={value._id} value={value._id}>
                                    {value.bearingType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='m-2'>
                        <label htmlFor="Bearing">Bearing: </label>
                        <select className={`${inputClass} w-60`} id='Bearing' name='selectedBearing' onChange={handleBearingChange} value={data.selectedBearing}>
                            <option value="">Select Bearing</option>
                            {bearingsByType.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className='m-2'>
                        <label htmlFor="SO. NO.">SO. NO.: </label>
                        <input type="text" id='SO. NO.' name='so' value={data.so} placeholder='eg: 0000000000/000/0' onChange={handleSoChange} className={inputClass} />
                    </div>
                </div>
                <div className='flex justify-center gap-8'>
                    {/* <button className={btnClass} onClick={handleFilterPump}>Enquire</button> */}
                    <button className={btnClass} onClick={handleReset}> Clear</button>
                </div>
                <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 text-center w-fit mx-auto">{filteredBearings.length}</div>

                {filteredBearings.length === 0 &&
                    <div>
                        <button className={btnClass}> Add to Order List</button>
                    </div>
                    // <div className='flex justify-center gap-8'>
                    //     <button className={btnClass} onClick={handleOrderList}> Add to Order List</button>
                    // </div>
                }

                {(filteredBearings && filteredBearings.length !== 0) &&
                    <div className='flex'>
                        <div className='border-2 ml-4 w-[50px] p-4 border-sky-600'><b>Sr. no. </b></div>
                        <div className={`mr-4 w-full border border-gray-500 rounded-md grid ${(admin) ? "grid-cols-7" : "grid-cols-6"}`}>
                            <div className='border p-4 border-sky-600'><b>Bearing Type </b></div>
                            <div className='border p-4 border-sky-600'><b>Bearing </b></div>
                            <div className='border p-4 border-sky-600'><b>So </b></div>
                            <div className='border p-4 border-sky-600'><b>KSB Invoice </b></div>
                            <div className='border p-4 border-sky-600'><b>KSB Invoice Data </b></div>
                            <div className='border p-4 border-sky-600'><b>Price </b></div>
                            {admin && <div className='border p-4 border-sky-600'><b>Operations </b></div>}
                        </div>
                    </div>}
                {filteredBearings &&
                    filteredBearings.map((bearing, index) => {
                        return <BearingCard bearing={bearing} handleFilterBearing={handleFilterBearing} admin={admin} index={index} />
                    })}

            </div>
        </div>
    )
}

export default AllBearings
