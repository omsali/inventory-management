import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PumpCard from '../components/PumpsCard/PumpCard';
import formatDate from '../Utils/FormatDate';
import formatPrice from '../Utils/FormatPrice';

const DispatchPump = () => {
  const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'

  const [dispatchedPumps, setDispatchedPumps] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/dispatchedpumps').then((response) => {
      setDispatchedPumps(response.data.pumps);
    });
  }, []);

  const handleDownloadCSV = () => {
    const a = document.createElement('a');
    a.href = 'http://localhost:5000/api/v1/downloadDP-csv';
    a.download = 'Dispatched-Pumps-[todays date].csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

  return (
    <div>
      {console.log(dispatchedPumps)}
      <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
      <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
        <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Dispatched Pump</div>
        <button className={`${btnClass} absolute right-5 top-5`} onClick={handleDownloadCSV}>Download All Pumps Data</button>
        <div className=' mx-4 border border-gray-500 rounded-md grid grid-cols-7'>
          <div className='border p-4 border-sky-600'><b>Pump Type </b></div>
          <div className='border p-4 border-sky-600'><b>Pump Size </b></div>
          <div className='border p-4 border-sky-600'><b>MOC </b></div>
          <div className='border p-4 border-sky-600'><b>So </b></div>
          <div className='border p-4 border-sky-600'><b>PPSS Invoice </b></div>
          <div className='border p-4 border-sky-600'><b>Price </b></div>
          <div className='border p-4 border-sky-600'><b>PPSS Invoice Data </b></div>
        </div>
        {dispatchedPumps &&
          dispatchedPumps.map((pump) => {
            return <div className=' mx-4 border border-gray-500 rounded-md grid grid-cols-7'>
              <div className='border p-4 border-sky-600'>{pump.pumpType}</div>
              <div className='border p-4 border-sky-600'>{pump.pumpSize}</div>
              <div className='border p-4 border-sky-600'>{pump.moc}</div>
              <div className='border p-4 border-sky-600'>{pump.so}</div>
              <div className='border p-4 border-sky-600'>{pump.PPInvoice}</div>
              <div className='border p-4 border-sky-600'>{formatPrice(pump.price)}</div>
              <div className='border p-4 border-sky-600'>{formatDate(pump.PPInvoiceDate)}</div>
            </div>
          })}
      </div>
    </div>
  )
}

export default DispatchPump