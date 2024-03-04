import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import axios from 'axios';

const ViewUpdateModal = ({ clickHandler, isOpen, spare }) => {
  const api = axios.create({
    baseURL: 'http://localhost:5000', // Set your backend server address here
  });

  const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
  const inputClass = 'px-2 h-8 border border-sky-400 bg-sky-100 rounded-md'

  const [newSpare, setNewSpare] = useState(spare)
  const [spares, setSpares] = useState([]);
  const [pumpTypes, setPumpTypes] = useState([]);
  const [pumpType, setPumpType] = useState([]);
  const [pumpBB, setPumpBB] = useState([]);
  const [pumpSize, setPumpSize] = useState([]);
  const [spareType, setSpareType] = useState([]);
  const [spareSize, setSpareSize] = useState([]);
  const [spareMOC, setSpareMOC] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    api.get('api/v1/allspares').then((response) => {
      setSpares(response.data.spares);
      setPumpTypes(response.data.spares[0].pumpTypes);
      setSpareType(response.data.spares[0].spareTypes);
      setSpareMOC(response.data.spares[0].moc);
    });
  }, []);

  const handleTypeChange = (event) => {
    const selectedID = event.target.value;
    setSelectedType(selectedID);
    
    const selectedPump = spares[0].pumpTypes.find((spare) => spare._id === selectedID);
    setNewSpare({ ...newSpare, [event.target.name]: selectedPump.pumpType })
    if (selectedPump) {
      setPumpType(selectedPump.pumpType)
      setPumpBB(selectedPump.pumpBB)
    }
  }

  const handleBBChange = (event) => {
    const selectedPBB = event.target.value;
    setNewSpare({ ...newSpare, [event.target.name]: selectedPBB })

    const selectedPumpBB = pumpBB.filter((spare) => spare.BBSize === selectedPBB);
    if (selectedPumpBB) {
        setPumpSize(selectedPumpBB[0].pumpSize)
    }
}


  const closeModal = () => {
    clickHandler();
  };

  const handleChange = (e) => {
    setNewSpare({ ...newSpare, [e.target.name]: e.target.value })
  }

  const onUpdate = async (id) => {
    const response = await fetch(`http://localhost:5000/api/v1/updatespare/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pumpType: newSpare.pumpType,
        pumpBB: newSpare.pumpBB,
        pumpSize: newSpare.pumpSize,
        spareType: newSpare.spareType,
        spareSize: newSpare.spareSize,
        moc: newSpare.moc,
        so: newSpare.so,
        newqty: newSpare.qty,
        price: newSpare.price,
        invoice: newSpare.KSBInvoice,
        date: newSpare.KSBInvoiceDate
      })
    });
    closeModal();
    if (response.status === 201) {
      alertSuccess("Update Sucessfully");
    }
    else {
      alertError("Update Failed");
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/[0.25] bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[550px] top-[60px] bg-sky-200 shadow- absolute px-[35px] py-8 border-style transition-all rounded-xl">
                <div className="flex flex-col justify-center items-center gap-[30px]">
                  <Dialog.Title
                    as="h3"
                    className="font-semibold text-[22px] leading-7 text-black "
                  >
                    Update Pump
                  </Dialog.Title>
                  <div className="text-lg">
                    <div className='mb-3 grid grid-cols-2'>
                      <label htmlFor="PumpType" className='text-lg font-bold'>Pump Type: </label>
                      <select className={`${inputClass}`} id='PumpType' name='pumpType' onChange={handleTypeChange} value={selectedType}>
                        <option value={newSpare.setPumpTypes}>{newSpare.pumpType}</option>
                        {pumpTypes.map((value) => (
                          <option key={value._id} value={value._id}>
                            {value.pumpType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-3 grid grid-cols-2'>
                      <label htmlFor="PumpBB" className='text-lg font-bold'>Pump B.B Size: </label>
                      <select className={`${inputClass}`} id='PumpBB' name='pumpBB' onChange={handleBBChange} value={newSpare.pumpBB}>
                        <option value={newSpare.pumpBB}>{newSpare.pumpBB}</option>
                        {pumpBB.map((value) => (
                          <option key={value._id} value={value.BBSize}>
                            {value.BBSize}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-3 grid grid-cols-2'>
                      <label htmlFor="PumpSize" className='text-lg font-bold'>Pump Size: </label>
                      <select className={inputClass} id='PumpSize' name='pumpSize' onChange={handleChange} value={newSpare.pumpSize}>
                        <option value={newSpare.pumpSize}>{newSpare.pumpSize}</option>
                        {pumpSize.map((value) => (
                          <option key={value._id} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='mb-3 grid grid-cols-2'>
                      <label htmlFor="SpareType" className='text-lg font-bold'>Spare Type: </label>
                      <select className={`${inputClass}`} id='SpareType' name='spareType' onChange={handleChange} value={newSpare.spareType}>
                        <option value="">Select Spare Type</option>
                        {spareType.map((value) => (
                          <option key={value._id} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="spareSize" className=""><b> Spare Size: </b></label>
                      <input type="string" className={inputClass} id="spareSize" name="spareSize" placeholder='100' value={newSpare.spareSize} onChange={handleChange} />
                    </div>
                    <div className='mb-3 grid grid-cols-2'>
                      <label htmlFor="Spare MOC" className='text-lg font-bold'>Spare MOC: </label>
                      <select className={inputClass} id='Spare MOC' name='moc' onChange={handleChange} value={newSpare.moc}>
                        <option value="">Select Spare MOC</option>
                        {spareMOC.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="so" className=""><b> SO NO: </b></label>
                      <input type="string" className={inputClass} id="so" name="so" value={newSpare.so} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="qty" className=""><b> Quantity: </b></label>
                      <input type="number" className={inputClass} id="qty" name="qty" value={newSpare.qty} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="KSBInvoice" className=""><b> KSB Invoice: </b></label>
                      <input type="text" className={inputClass} id="KSBInvoice" name="KSBInvoice" value={newSpare.KSBInvoice} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="KSBInvoiceDate" className=""><b> KSB Invoice Date: </b></label>
                      <input type="date" className={inputClass} id="KSBInvoiceDate" name="KSBInvoiceDate" value={newSpare.KSBInvoiceDate} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="price" className=""><b> Price: </b></label>
                      <input type='number' className={inputClass} name="price" id="price" value={newSpare.price} onChange={handleChange}></input>
                    </div>
                    {/* <p><b>KSB Invoice Data: </b>{formatDate(spare.KSBInvoiceDate)}</p> */}
                    <div className='text-center'>
                      <button className={btnClass} onClick={() => onUpdate(newSpare._id)}>Update</button>
                      <button className={btnClass} onClick={closeModal}>Cancel</button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ViewUpdateModal