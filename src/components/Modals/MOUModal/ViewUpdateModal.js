import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import axios from 'axios';

const ViewUpdateModal = ({ clickHandler, isOpen, mou }) => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md'

    const [mouData, setMouData] = useState(mou)

    const closeModal = () => {
        clickHandler();
    };



    const handleChange = (e) => {
        setMouData({ ...mouData, [e.target.name]: e.target.value })
    }

    const handleQChange = (e, quarterIndex) => {
        const { name, value } = e.target;
        const updatedMouData = JSON.parse(JSON.stringify(mouData));
        if (value !== '') {
            updatedMouData.quarters[quarterIndex].quarterTarget = parseInt(value);
          } else {
            updatedMouData.quarters[quarterIndex].quarterTarget = 0;
          }
        setMouData(updatedMouData);
    };


    const onUpdate = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/updatemou/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: mouData.pumpType,
                totalQty: mouData.totalQty,
                quarters: mouData.quarters
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
                                        Update MOU
                                    </Dialog.Title>
                                    <div className="text-lg">

                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="pumpType" className=""><b> Pump Types :  </b></label>
                                            <input type="text" className={inputClass} id="pumpType" name="pumpType" value={mouData.pumpType} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="totalQty" className=""><b> Total Target Quantity </b></label>
                                            <input type="number" className={inputClass} id="totalQty" name="totalQty" value={mouData.totalQty} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="firstTarget" className=""><b> First Target: </b></label>
                                            <input type="number" className={inputClass} id="firstTarget" name={`quarters[0].quarterTarget`} value={mouData.quarters[0].quarterTarget} onChange={(e) => handleQChange(e, 0)} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="secondTarget" className=""><b> Second Target: </b></label>
                                            <input type="number" className={inputClass} id="secondTarget" name={`quarters[1].quarterTarget`} value={mouData.quarters[1].quarterTarget} onChange={(e) => handleQChange(e, 1)} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="thirdTarget" className=""><b> Third Target: </b></label>
                                            <input type="number" className={inputClass} id="thirdTarget" name={`quarters[2].quarterTarget`} value={mouData.quarters[2].quarterTarget} onChange={(e) => handleQChange(e, 2)} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2">
                                            <label htmlFor="fourthTarget" className=""><b> Fourth Target: </b></label>
                                            <input type="number" className={inputClass} id="fourthTarget" name={`quarters[3].quarterTarget`} value={mouData.quarters[3].quarterTarget} onChange={(e) => handleQChange(e, 3)} />
                                        </div>
                                        <div className='text-center'>
                                            <button className={btnClass} onClick={() => onUpdate(mou._id)}>Update</button>
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