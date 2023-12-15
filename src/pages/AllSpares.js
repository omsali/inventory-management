import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import SpareCard from '../components/SparesCard/SpareCard';
import SpareNavbar from '../components/Navbar/SpareNavbar';

const AllSpares = () => {
  const api = axios.create({
    baseURL: 'http://localhost:5000', // Set your backend server address here
  });
  const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
  const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2'

  const [pumps, setPumps] = useState([]);
  const [filteredSpares, setFilteredSpares] = useState([]);
  const [selectedPumpType, setSelectedPumpType] = useState('');
  const [selectedPumpID, setSelectedPumpID] = useState('');
  const [selectedPumpSize, setSelectedPumpSize] = useState('');
  const [selectedSpareType, setSelectedSpareType] = useState('');
  const [selectedSpareMOC, setSelectedSpareMOC] = useState('');

  const [stockSpares, setStockSpares] = useState([])
  const [filteredByType, setFilteredByType] = useState([]);
  const [filteredBySize, setFilteredBySize] = useState([]);
  const [filteredBySpare, setFilteredBySpare] = useState([]);

  const [pumpType, setPumpType] = useState([]);
  const [pumpSize, setPumpSize] = useState([]);
  const [spareType, setSpareType] = useState([]);
  const [spareMOC, setSpareMOC] = useState([]);

  useEffect(() => {
    api.get('api/v1/allspares').then((response) => {
      setPumps(response.data.spares);
      // setFilteredPumps(response.data.pumps);
    });
    api.get('api/v1/getspares').then((response) => {
      setStockSpares(response.data.spares);
      setFilteredSpares(response.data.spares);
      setFilteredByType(response.data.spares);
      // console.log(filteredByType);
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
      setSpareMOC(selectedPumpT.moc)
      setSpareType(selectedPumpT.spareType)
    } else {
      setPumpSize("size");
      setSpareType("type");
      setSpareMOC("moc");
    }

    const filterByType = stockSpares.filter((pump) => {
      return (
        (!selectedPumpT.pumpType || pump.pumpType === selectedPumpT.pumpType)
      )
    });
    setFilteredByType(filterByType)
    setFilteredSpares(filterByType);
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
    setFilteredSpares(filterBySize);
  }

  const handleSpareTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedSpareType(selectedType);
    const filterBySpareType = filteredBySize.filter((pump) => {
      return (
        (!selectedType || pump.spareType === selectedType)
      )
    });
    setFilteredBySpare(filterBySpareType);
    setFilteredSpares(filterBySpareType);
  }

  const handleMOCChange = (event) => {
    const selectedMOC = event.target.value
    setSelectedSpareMOC(selectedMOC);
    const filterByMOC = filteredBySpare.filter((pump) => {
      return (
        (!selectedMOC || pump.moc === selectedMOC)
      )
    });
    setFilteredSpares(filterByMOC);
  }

  const handleFilterSpare = async () => {
    let allPumps = [];
    api.get('api/v1/getspares').then((response) => {
      allPumps = response.data.spares;
      setStockSpares(response.data.spares);
      const filterByPara = allPumps.filter((pump) => {
        return (
          (!selectedPumpType || pump.pumpType === selectedPumpType) &&
          (!selectedPumpSize || pump.pumpSize === selectedPumpSize) &&
          (!selectedSpareType || pump.spareType === selectedSpareType) &&
          (!selectedSpareMOC || pump.moc === selectedSpareMOC)
        )
      });
      setFilteredSpares(filterByPara);
    });
  }

  const handleReset = () => {

    setFilteredSpares(stockSpares);
    setSelectedPumpID('');
    setSelectedPumpType('');
    setSelectedPumpSize('');
    setSelectedSpareType('');
    setSelectedSpareMOC('');
  }

  const handleDownloadCSV = () => {
    const a = document.createElement('a');
    a.href = 'http://localhost:5000/api/v1/downloadspares-csv';
    a.download = 'Instock-Spares-[todays date].csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className=''>
      <SpareNavbar />
      <div className='bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl '></div>
      <div className='border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl mx-auto my-8 pb-8 bg-sky-300'>
        <div className='my-4 text-center font-bold text-4xl text-zinc-900 italic'>Search and Dispatch</div>
        <button className={`${btnClass} absolute right-5 top-20`} onClick={handleDownloadCSV}>Download All Spares Data</button>
        <div className=' flex justify-center'>
          {/* {console.log(filteredPumps)} */}
          <div className='m-2'>
            <label htmlFor="PumpType">Pump Type: </label>
            <select className={inputClass} id='PumpType' onChange={handleTypeChange} value={selectedPumpID}>
              <option value="">Select Pump Type</option>
              {pumps.map((value) => (
                <option key={value._id} value={value._id}>
                  {value.pumpType}
                </option>
              ))}
            </select>
          </div>
          <div className='m-2'>
            <label htmlFor="PumpSize">Pump Size: </label>
            <select className={inputClass} id='PumpSize' onChange={handleSizeChange} value={selectedPumpSize}>
              <option value="">Select Pump Size</option>
              {pumpSize.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className='m-2'>
            <label htmlFor="SpareType">Spare Type: </label>
            <select className={inputClass} id='SpareType' onChange={handleSpareTypeChange} value={selectedSpareType}>
              <option value="">Select Spare Type</option>
              {spareType.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className='m-2'>
            <label htmlFor="Pump Type">Pump MOC: </label>
            <select className={inputClass} id='Pump MOC' onChange={handleMOCChange} value={selectedSpareMOC}>
              <option value="">Select Pump MOC</option>
              {spareMOC.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='flex justify-center gap-8'>
          {/* <button className={btnClass} onClick={handleFilterPump}>Enquire</button> */}
          <button className={btnClass} onClick={handleReset}> Clear</button>
        </div>
        <div className="px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 text-center w-fit mx-auto">{filteredSpares.length}</div>

        {(filteredSpares && filteredSpares.length !== 0) && <div className=' mx-4 border border-gray-500 rounded-md grid grid-cols-9'>
          <div className='border p-4 border-sky-600 text-center'><b>Pump Type </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>Pump Size </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>Spare Type </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>MOC </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>Quantity </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>KSB Invoice </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>KSB Invoice Data </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>Price </b></div>
          <div className='border p-4 border-sky-600 text-center'><b>Operations </b></div>
        </div>}
        {filteredSpares &&
          filteredSpares.map((spare) => {
            return <SpareCard spare={spare} handleFilterSpare={handleFilterSpare} />
          })}

      </div>
      <ToastContainer />
    </div>
  )
}

export default AllSpares