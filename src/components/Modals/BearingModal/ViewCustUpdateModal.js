import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import axios from 'axios';

const ViewCustUpdateModal = ({ clickHandler, isOpen, bearing }) => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md'

    const [newBearing, setNewBearing] = useState(bearing)
    // const [bearings, setBearings] = useState([]);
    // const [bearingType, setBearingType] = useState([]);
    // const [bearingSize, setBearingSize] = useState([]);
    // const [bearingMOC, setBearingMOC] = useState([]);
    // const [selectedBearingType, setSelectedBearingType] = useState('');

    // useEffect(() => {
    //     api.get('api/v1/allbearings').then((response) => {
    //         const resdata = response.data.bearings;
    //         setBearings(response.data.bearings);
    //         // console.log(response.data);
    //         const selectedBearingT = resdata.find((bearing) => bearing._id === newBearing._id);
    //         setBearingType(selectedBearingT);
    //         if (selectedBearingT) {
    //             setBearingSize(selectedBearingT.bearingSize)
    //             setBearingMOC(selectedBearingT.moc)
    //         }
    //     });
    // }, []);

    const closeModal = () => {
        clickHandler();
    };

    const handleChange = (e) => {
        setNewBearing({ ...newBearing, [e.target.name]: e.target.value })
    }

    const onUpdate = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/updatebearingcustsheet/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName: newBearing.customerName,
                PPPrice: newBearing.PPPrice,
                DueDate: newBearing.DueDate
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
                                        Update Customer Book Sheet
                                    </Dialog.Title>
                                    <div className="text-lg">
                                       {/* {console.log(newBearing)} */}
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="CustomerName" className=""><b> Customer Name: </b></label>
                                            <input type='text' className={inputClass} name="customerName" id="customerName" value={newBearing.customerName} onChange={handleChange}></input>
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="PPPrice" className=""><b> Price: </b></label>
                                            <input type='number' className={inputClass} name="PPPrice" id="PPPrice" value={newBearing.PPPrice} onChange={handleChange}></input>
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="DueDate" className=""><b> Due Date: </b></label>
                                            <input type='date' className={inputClass} name="DueDate" id="DueDate" value={newBearing.DueDate} onChange={handleChange}></input>
                                        </div>
                                        {/* <p><b>KSB Invoice Data: </b>{formatDate(bearing.KSBInvoiceDate)}</p> */}
                                        <div className='text-center'>
                                            <button className={btnClass} onClick={() => onUpdate(newBearing._id)}>Update</button>
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

export default ViewCustUpdateModal