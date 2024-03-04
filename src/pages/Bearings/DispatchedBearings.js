import React, { useEffect, useState } from 'react'
import axios from 'axios';
import formatDate from '../../Utils/FormatDate';
import formatPrice from '../../Utils/FormatPrice';
import BearingNavbar from '../../components/Navbar/BearingNavbar';
import DispatchCard from '../../components/BearingCard/DispatchCard';

const DispatchedBearings = () => {
  const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
  const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

  const [bearings, setBearings] = useState([]);
  const [filteredBearings, setFilteredBearings] = useState([]);
  const [selectedBearingType, setSelectedBearingType] = useState('');
  const [selectedBearingID, setSelectedBearingID] = useState('');
  const [selectedBearing, setSelectedBearing] = useState('');
  const [so, setSo] = useState('');

  const [dispatchedBearings, setDispatchedBearings] = useState();
  const [filteredByType, setFilteredByType] = useState([]);

  const [bearingByType, setBearingByType] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/allbearings').then((response) => {
      setBearings(response.data.bearings);
    });
    axios.get('http://localhost:5000/api/v1/dispatchedbearings').then((response) => {
      setDispatchedBearings(response.data.bearings);
      setFilteredBearings(response.data.bearings);
      setFilteredByType(response.data.bearings);
    });
  }, []);

  const handleTypeChange = (event) => {
    const id = event.target.value;
    setSelectedBearingID(id);

    const selectedBearingT = bearings.find((bearing) => bearing._id === id);
    setSelectedBearingType(selectedBearingT.bearingType);
    if (selectedBearingT) {
      setBearingByType(selectedBearingT.bearings)
    }
    const filterByType = dispatchedBearings.filter((bearing) => {
      return (
        (!selectedBearingT.bearingType || bearing.bearingType === selectedBearingT.bearingType)
      )
    });
    setFilteredByType(filterByType)
    setFilteredBearings(filterByType);
  }

  const handleBearingChange = (event) => {
    const selectedBearing = event.target.value;
    setSelectedBearing(selectedBearing);
    const filterBySize = filteredByType.filter((bearing) => {
      return (
        (!selectedBearing || bearing.bearing === selectedBearing)
      )
    });
    setFilteredBearings(filterBySize);
  }

  const handleSoChange = (event) => {
    const so = event.target.value;
    setSo(so);
    const filterBySo = dispatchedBearings.filter((bearing) => {
        return (
            (!so || bearing.so.includes(so))
        )
    });
    setFilteredBearings(filterBySo);
}

  const handleReset = () => {

    setFilteredBearings(dispatchedBearings);
    setSelectedBearingID('');
    setSelectedBearingType('');
    setSelectedBearing('');
  }

  const handleDownloadCSV = () => {
    const a = document.createElement('a');
    a.href = 'http://localhost:5000/api/v1/downloadBDP-csv';
    a.download = 'Dispatched-Bearings-[todays date].csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      <BearingNavbar />
      {/* {console.log(dispatchedBearings)} */}
      <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
      <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
        <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Dispatched Bearing</div>
        <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download Dispatched Bearings Data</button>
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
            <label htmlFor="Bearing Type">Bearing: </label>
            <select className={inputClass} id='Bearing Size' onChange={handleBearingChange} value={selectedBearing}>
              <option value="">Select Bearing</option>
              {bearingByType.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className='m-2'>
            <label htmlFor="SO. NO.">SO. NO.: </label>
            <input type="text" id='SO. NO.' value={so} placeholder='eg: 0000000000/000/0' onChange={handleSoChange} className={inputClass} />
          </div>
        </div>
        <div className='flex justify-center gap-8'>
          {/* <button className={btnClass} onClick={handleFilterBearing}>Enquire</button> */}
          <button className={btnClass} onClick={handleReset}> Clear</button>
        </div>
        <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 text-center w-fit mx-auto">{filteredBearings.length}</div>

        {(filteredBearings && filteredBearings.length !== 0) &&
          <div className='flex text-center'>
          <div className='border-2 w-[50px] ml-4 p-4 border-sky-600'><b>Sr. no. </b></div>
          <div className=' mr-4 border border-gray-500 rounded-md w-full grid grid-cols-12'>
              <div className='border p-4 border-sky-600 col-span-2'><b>Customer Name </b></div>
              <div className='border p-4 border-sky-600 col-span-2'><b>Bearing Specification </b></div>
              <div className='border p-4 border-sky-600 col-span-2'><b>So </b></div>
              <div className='border p-4 border-sky-600 col-span-2'><b>PPSS Invoice </b></div>
              <div className='border p-4 border-sky-600 col-span-2'><b>Date </b></div>
              <div className='border p-4 border-sky-600 col-span-2'><b>Price </b></div>
          </div>
      </div>}
        {filteredBearings &&
          filteredBearings.map((bearing, index) => {
            return <DispatchCard bearing={bearing} index={index} />
          })}
      </div>
    </div>
  )
}

export default DispatchedBearings
