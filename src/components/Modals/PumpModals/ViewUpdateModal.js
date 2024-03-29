import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import axios from 'axios';

const ViewUpdateModal = ({ clickHandler, isOpen, pump }) => {
  const api = axios.create({
    baseURL: 'http://localhost:5000', // Set your backend server address here
  });

  const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
  const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md'

  const [newPump, setNewPump] = useState(pump)
  const [pumps, setPumps] = useState([]);
  const [pumpType, setPumpType] = useState([]);
  const [pumpSize, setPumpSize] = useState([]);
  const [pumpMOC, setPumpMOC] = useState([]);
  const [selectedPumpType, setSelectedPumpType] = useState('');
  const [desc, setDesc] = useState('');
  const [subDesc, setSubDesc] = useState('');
  const [submersible, setSubmersible] = useState(false);

  const [ETA, setETA] = useState('')

  useEffect(() => {
    api.get('api/v1/allpumps').then((response) => {
      const resdata = response.data.pumps;
      setPumps(response.data.pumps);
      // console.log(response.data);
      const selectedPumpT = resdata.find((pump) => pump._id === newPump._id);
      setPumpType(selectedPumpT);
      if (selectedPumpT) {
        setPumpSize(selectedPumpT.pumpSize)
        setPumpMOC(selectedPumpT.moc)
      }
      // if (selectedPumpT.pumpType.includes('ETABLOC')) {
      //   setETA(true);
      // }
    });
  }, []);

  const closeModal = () => {
    clickHandler();
  };

  const handleTypeChange = (event) => {
    const selectedPumpId = event.target.value;
    setSelectedPumpType(selectedPumpId);

    const selectedPumpT = pumps.find((pump) => pump._id === selectedPumpId);
    setPumpType(selectedPumpT);
    if (selectedPumpT.pumpType.includes('Submersible')) {
      setSubmersible(true);
    } else {
      setNewPump({ ...newPump, [event.target.name]: selectedPumpT.pumpType })
      setSubmersible(false);

      if (selectedPumpT) {
        setPumpSize(selectedPumpT.pumpSize)
        setPumpMOC(selectedPumpT.moc)
      } else {
        alertError("Failed to fetch, Please Refresh");
      }

      setETA(false);
      if (selectedPumpT.pumpType.includes('ETABLOC')) {
        setETA(true);
        // console.log(true);
      }
    }
  }

  const handleChange = (e) => {
    setNewPump({ ...newPump, [e.target.name]: e.target.value })
  }
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  }
//   const handleSubChange = (event) => {
//     setSubDesc(event.target.value);
// }


  const onUpdate = async (id) => {
    let newPumpSize = newPump.pumpSize
    if (desc) {
      newPumpSize = newPump.pumpSize + ' - ' + desc;
    }
    const response = await fetch(`http://localhost:5000/api/v1/updatepump/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pumpType: newPump.pumpType,
        pumpSize: newPumpSize,
        moc: newPump.moc,
        so: newPump.so,
        subDesc: newPump.subDesc,
        seal: newPump.seal,
        price: newPump.price,
        invoice: newPump.KSBInvoice,
        invoiceDate: newPump.KSBInvoiceDate
      })
    });
    // handleUpdate(nPump);
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
                    {console.log(newPump)}
                    <div className='mb-3 grid grid-cols-2'>
                      <label htmlFor="Pump Type" className='font-bold'>Pump Type: </label>
                      <select className={inputClass} id='Pump Type' name='pumpType' onChange={handleTypeChange} value={selectedPumpType}>
                        <option value={newPump.pumpType}>{newPump.pumpType}</option>
                        {pumps.map((value) => (
                          <option key={value._id} value={value._id}>
                            {value.pumpType}
                          </option>
                        ))}
                      </select>
                    </div>
                    {(!pump.sub && pump.sub === false) ? (
                      <>
                        <div className='mb-3 grid grid-cols-2'>
                          <label htmlFor="Pump Size" className='font-bold'>Pump Size: </label>
                          <select className={inputClass} id='Pump Size' name='pumpSize' onChange={handleChange} value={newPump.pumpSize}>
                            <option value={newPump.pumpSize}>{newPump.pumpSize}</option>
                            {pumpSize.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        {(ETA === true) &&
                          <div className='mb-3 grid grid-cols-2'>
                            <label htmlFor="description" className='font-bold'>Description: </label>
                            <input type="text"
                              value={desc}
                              onChange={handleDescChange}
                              className={inputClass} />
                          </div>
                        }
                        <div className='mb-3 grid grid-cols-2'>
                          <label htmlFor="Pump MOC" className='font-bold'>Pump MOC: </label>
                          <select className={inputClass} id='Pump MOC' name='moc' onChange={handleChange} value={newPump.moc}>
                            <option value={newPump.moc}>{newPump.moc}</option>
                            {pumpMOC.map((value) => (
                              <option key={value} value={value}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='mb-3 grid grid-cols-2'>
                          <label htmlFor="sealing" className='font-bold'>Sealing: </label>
                          <select className={inputClass} id='Pump Size' name='seal' onChange={handleChange} value={newPump.seal}>
                            <option value={newPump.seal}>{newPump.seal}</option>
                            <option value="Gland Pack">Gland Pack</option>
                            <option value="Sealed">Sealed</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <div className='mb-3 grid grid-cols-2'>
                        <label htmlFor="sub" className='font-bold'>Description: </label>
                        <textarea
                          className='p-5 border-none rounded-md m-0 '
                          name="subDesc" id="sub" cols="30" rows="5"
                          value={newPump.subDesc}
                          placeholder='Enter the description of submersible pump'
                          onChange={handleChange}></textarea>
                      </div>
                    )
                    }
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="so" className=""><b> So.no: </b></label>
                      <input type="text" className={inputClass} id="so" name="so" value={newPump.so} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="KSBInvoice" className=""><b> KSB Invoice: </b></label>
                      <input type="text" className={inputClass} id="KSBInvoice" name="KSBInvoice" value={newPump.KSBInvoice} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="KSBInvoiceDate" className=""><b> KSB Invoice Date: </b></label>
                      <input type="date" className={inputClass} id="KSBInvoiceDate" name="KSBInvoiceDate" value={newPump.KSBInvoiceDate} onChange={handleChange} />
                    </div>
                    <div className="mb-3 grid grid-cols-2">
                      <label htmlFor="price" className=""><b> Price: </b></label>
                      <input type='number' className={inputClass} name="price" id="price" value={newPump.price} onChange={handleChange}></input>
                    </div>
                    {/* <p><b>KSB Invoice Data: </b>{formatDate(pump.KSBInvoiceDate)}</p> */}
                    <div className='text-center'>
                      <button className={btnClass} onClick={() => onUpdate(newPump._id)}>Update</button>
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