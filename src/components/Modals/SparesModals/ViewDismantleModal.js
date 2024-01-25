import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import axios from 'axios';

const ViewDismantleModal = ({ spare, pumps, clickHandler, isOpen }) => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-4 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md w-52  '

    const closeModal = () => {
        clickHandler();
    };

    const handleDismantle = () => {

    }

    const handleAddSpare = () => {
        
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
                            <Dialog.Panel className="w-[90vw] max-h-[60vh] min-h-[40vh] top-[60px] bg-sky-200 shadow- absolute px-[35px] py-8 border-style transition-all rounded-xl">
                                <div className="flex flex-col justify-center items-center gap-[30px]">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-semibold text-[22px] leading-7 text-black "
                                    >
                                        Dismantle Pump
                                    </Dialog.Title>
                                    <div className="text-lg">
                                        {console.log(pumps)}
                                        {pumps &&
                                            (pumps.length !== 0) &&
                                            pumps.map((pump) => {
                                                return <div className='flex text-center align-middle'>
                                                    {/* <div className='border-2 ml-4 w-[100px] p-4 border-sky-600'>{index + 1}</div> */}
                                                    <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-7`}>
                                                        <div className='border pt-4 border-sky-600'>{pump.pumpType} </div>
                                                        <div className='border p-4 border-sky-600'>{pump.pumpSize} </div>
                                                        <div className='border p-4 border-sky-600'>{pump.moc} </div>
                                                        <div className='border p-4 border-sky-600'>{pump.so} </div>
                                                        <div className='border p-4 border-sky-600'>{pump.seal} </div>
                                                        {/* <div className='border col-span-1 border-sky-600'>
                                                            <select className={`${inputClass} w-[180px] border  p-3 border-sky-400`}>
                                                                {pump.dismantleParts && pump.dismantleParts.map((part) =>
                                                                    <option >{part} </option>
                                                                )}
                                                            </select>
                                                        </div> */}
                                                        <button className={btnClass} onClick={handleAddSpare}>Add Spare</button>
                                                    </div>
                                                </div>
                                            })}
                                        <div className='text-center'>
                                            <button className={btnClass} onClick={handleDismantle}>Dismantle</button>
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
    )
}

export default ViewDismantleModal