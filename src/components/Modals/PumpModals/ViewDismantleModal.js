import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import axios from 'axios';

const ViewDismantleModal = ({ clickHandler, isOpen, pump }) => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md w-52  '
    //   const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md'

    const [sparesMOC, setSparesMOC] = useState([])
    const [spareType, setSpareType] = useState([])
    // const [selectedSpareType, setSelectedSpareType] = useState('')
    const [data, setData] = useState({
        spareMOC: '',
        spareType: '',
        // PPInvoice: '',
        // PPInvoiceDate: '',
        // PPPrice: ''
    })

    useEffect(() => {
        api.get('api/v1/allspares').then((response) => {
            setSparesMOC(response.data.spares[0].moc);
            setSpareType(response.data.spares[0].spareTypes);
            // console.log(response.data.spares[0].spareTypes);
        });
    }, []);

    const closeModal = () => {
        clickHandler();
    };

    const inputData = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    const addToSpares = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/addspare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: pump.pumpType,
                pumpSize: pump.pumpSize,
                spareType: data.spareType,
                moc: data.spareMOC,
                qty: 1,
                price: 0,
                KSBInvoice: '- - - - -',
                // KSBInvoiceDate: 
            })
        });
    };

    const dismantlePumps = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/dismantlepumps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: pump.pumpType,
                pumpSize: pump.pumpSize,
                spareType: data.spareType,
                so: pump.so,
                seal: pump.seal,
                moc: pump.moc,
            })
        });
        return response;
    }

    const handleDismantle = async (id) => {
        const response = await dismantlePumps();
        if (response.status === 404) {
            alertError("Part Already Dismantled")
        } else if (response.status === 200) {
            alertSuccess("Part Dismantled Successfully")
            addToSpares();
        }
        closeModal();
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
                                        Dismantle Pump
                                    </Dialog.Title>
                                    <div className="text-lg">
                                        <div className="mx-2 my-4 grid grid-cols-2 ">
                                            <b>Pump Type: </b> {pump.pumpType}
                                        </div>
                                        <div className="mx-2 my-4 grid grid-cols-2 ">
                                            <b>Pump Size: </b> {pump.pumpSize}
                                        </div>
                                        <div className="mx-2 my-4 grid grid-cols-2 ">
                                            <b>Pump MOC: </b> {pump.moc}
                                        </div>
                                        
                                        <div className='mx-2 my-4 grid grid-cols-2'>
                                            <label htmlFor="Spare Type" className=' font-medium pt-2'><b>Spare Type: </b></label>
                                            <select className={`${inputClass}`} id='SpareType' name='spareType' onChange={inputData} value={data.spareType}>
                                                <option value="">Select Spare Type</option>
                                                {spareType.map((value) => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mx-2 my-4 grid grid-cols-2'>
                                            <label htmlFor="Spare MOC" className=' font-medium pt-2'><b>Spare MOC: </b></label>
                                            <select className={`${inputClass}`} id='Spare MOC' name='spareMOC' onChange={inputData} value={data.spareMOC}>
                                                <option value="">Select Spare MOC</option>
                                                {sparesMOC.map((value) => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <div className="m-2 grid grid-cols-2 ">
                                            <label htmlFor="PPInvoice" className=' font-medium pt-2'><b> PPSS Invoice: </b></label>
                                            <input type="text" className={inputClass} id={`invoice${pump._id}`} name="PPInvoice" value={data.PPInvoice} onChange={inputData} />
                                        </div>
                                        <div className="m-2 grid grid-cols-2 ">
                                            <label htmlFor="PPInvoiceDate" className=' font-medium pt-2'><b> PPSS Invoice Date: </b></label>
                                            <input type="date" className={inputClass} id={`date${pump._id}`} name="PPInvoiceDate" value={data.PPInvoiceDate} onChange={inputData} />
                                        </div>
                                        <div className="m-2 grid grid-cols-2 ">
                                            <label htmlFor="PPPrice" className=' font-medium pt-2'><b> PPSS Price: </b></label>
                                            <input type="number" className={inputClass} id={`date${pump._id}`} name="PPPrice" value={data.PPPrice} onChange={inputData} />
                                        </div> */}
                                        <div className='text-center'>
                                            <button className={btnClass} onClick={() => handleDismantle(pump._id)}>Dismantle</button>
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

export default ViewDismantleModal