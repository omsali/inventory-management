import React, { useEffect, useState } from 'react'
import axios from 'axios';
import formatDate from '../Utils/FormatDate';
import formatPrice from '../Utils/FormatPrice';
import Navbar from '../components/Navbar/Navbar';

const DispatchPump = () => {
  const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
  const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

  const [pumps, setPumps] = useState([]);
  const [filteredPumps, setFilteredPumps] = useState([]);
  const [selectedPumpType, setSelectedPumpType] = useState('');
  const [selectedPumpID, setSelectedPumpID] = useState('');
  const [selectedPumpSize, setSelectedPumpSize] = useState('');
  const [selectedPumpMOC, setSelectedPumpMOC] = useState('');
  const [soNo, setSoNo] = useState('');

  const [dispatchedPumps, setDispatchedPumps] = useState();
  const [filteredByType, setFilteredByType] = useState([]);
  const [filteredBySize, setFilteredBySize] = useState([]);

  const [pumpType, setPumpType] = useState([]);
  const [pumpSize, setPumpSize] = useState([]);
  const [pumpMOC, setPumpMOC] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/allpumps').then((response) => {
      setPumps(response.data.pumps);
    });
    axios.get('http://localhost:5000/api/v1/dispatchedpumps').then((response) => {
      setDispatchedPumps(response.data.pumps);
      setFilteredPumps(response.data.pumps);
      setFilteredByType(response.data.pumps);
    });
  }, []);

  const handleTypeChange = (event) => {
    const id = event.target.value;
    setSelectedPumpID(id);

    const selectedPumpT = pumps.find((pump) => pump._id === id);
    setPumpType(selectedPumpT);
    setSelectedPumpType(selectedPumpT.pumpType);
    if (selectedPumpT) {
      setPumpSize(selectedPumpT.pumpSize)
      setPumpMOC(selectedPumpT.moc)
    }
    const filterByType = dispatchedPumps.filter((pump) => {
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
    const filterBySo = dispatchedPumps.filter((pump) => {
        return (
            (!so || pump.so.includes(so))
        )
    });
    setFilteredPumps(filterBySo);
}

  // const handleFilterPump = async () => {
  //   let allPumps = [];
  //   axios.get('http://localhost:5000/api/v1/dispatchedpumps').then((response) => {
  //     allPumps = response.data.pumps;
  //     setDispatchedPumps(response.data.pumps);
  //     const filterByPara = allPumps.filter((pump) => {
  //       return (
  //         (!selectedPumpType || pump.pumpType === selectedPumpType) &&
  //         (!selectedPumpSize || pump.pumpSize === selectedPumpSize) &&
  //         (!selectedPumpMOC || pump.moc === selectedPumpMOC)
  //       )
  //     });
  //     setFilteredPumps(filterByPara);
  //   });
  // }

  const handleReset = () => {

    setFilteredPumps(dispatchedPumps);
    setSelectedPumpID('');
    setSelectedPumpType('');
    setSelectedPumpSize('');
    setSelectedPumpMOC('');
  }

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
      <Navbar />
      {/* {console.log(dispatchedPumps)} */}
      <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
      <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
        <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Dispatched Pump</div>
        <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download Dispatched Pumps Data</button>
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

        {(filteredPumps && filteredPumps.length !== 0) &&
          <div className='flex'>
            <div className='border-2 w-[50px] ml-4 p-4 border-sky-600'><b>Sr. no. </b></div>
            <div className=' mr-4 border border-gray-500 rounded-md grid grid-cols-8'>
              <div className='border p-4 border-sky-600'><b>Pump Type </b></div>
              <div className='border p-4 border-sky-600'><b>Pump Size </b></div>
              <div className='border p-4 border-sky-600'><b>MOC </b></div>
              <div className='border p-4 border-sky-600'><b>So </b></div>
              <div className='border p-4 border-sky-600'><b>Sealing </b></div>
              <div className='border p-4 border-sky-600'><b>PPSS Invoice </b></div>
              <div className='border p-4 border-sky-600'><b>Price </b></div>
              <div className='border p-4 border-sky-600'><b>PPSS Invoice Data </b></div>
            </div>
          </div>}
        {filteredPumps &&
          filteredPumps.map((pump, index) => {
            return (
              <div className='flex'>
                <div className='border-2 w-[50px] ml-4 p-4 border-sky-600'>{index + 1}</div>
                <div className=' mr-4 border border-gray-500 w-full rounded-md grid grid-cols-8'>
                  <div className='border p-4 border-sky-600'>{pump.pumpType}</div>
                  <div className='border p-4 border-sky-600'>{pump.pumpSize}</div>
                  <div className='border p-4 border-sky-600'>{pump.moc}</div>
                  <div className='border p-4 border-sky-600'>{pump.so}</div>
                  <div className='border p-4 border-sky-600'>{pump.seal}</div>
                  <div className='border p-4 border-sky-600'>{pump.PPInvoice}</div>
                  <div className='border p-4 border-sky-600'>{formatPrice(pump.price)}</div>
                  <div className='border p-4 border-sky-600'>{formatDate(pump.PPInvoiceDate)}</div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default DispatchPump