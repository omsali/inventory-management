import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import formatDate from '../../../Utils/FormatDate';

const ViewDispatchModal = ({ clickHandler, isOpen, pump }) => {
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md '

    const [newPump, setNewPump] = useState({
        PPInvoice: "",
        PPInvoiceDate: pump.KSBInvoiceDate,
        price: 0,
    });
    const onDispatch = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/dispatchpump`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName: pump.CustomerName,
                pumpType: pump.pumpType,
                pumpSize: pump.pumpSize,
                moc: pump.moc,
                so: pump.so,
                seal: pump.seal,
                KSBPrice: pump.KSBPrice,
                PPPrice: pump.PPPrice,
                PPInvoice: newPump.PPInvoice,
                AllotDate: pump.DueDate,
                KSBInvoiceDate: pump.KSBInvoiceDate,
                PPInvoiceDate: newPump.PPInvoiceDate
            })
        });

        await handleDelete(pump._id);
        closeModal();
        if (response.status === 201) {
            alertSuccess("Dispatched Sucessfully");
        }
        else {
            alertError("Dispatch Failed");
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/dispatchpump/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // alertSuccess("Dispatched Sucessfully");
    };

    const closeModal = () => {
        clickHandler();
    };

    const handleChange = (e) => {
        setNewPump({ ...newPump, [e.target.name]: e.target.value })
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
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Customer Name: </b>{pump.CustomerName}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Pump Type: </b>{pump.pumpType}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Pump Size: </b>{pump.pumpSize}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>MOC: </b>{pump.moc}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Sealing </b>{pump.seal}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>SO: </b>{pump.so}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>KSB Price: </b>{pump.KSBPrice}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>PPSS Price: </b>{pump.PPPrice}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Alloted Date: </b>{formatDate(pump.DueDate)}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <label htmlFor="KSBInvoice" className=""><b> PPSS Invoice: </b></label>
                                            <input type="text" className={inputClass} id={`invoice${newPump._id}`} name="PPInvoice" value={newPump.PPInvoice} onChange={handleChange} />
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <label htmlFor="KSBInvoiceDate" className=""><b> PPSS Invoice Date: </b></label>
                                            <input type="date" className={inputClass} id={`date${newPump._id}`} name="PPInvoiceDate" value={newPump.PPInvoiceDate} onChange={handleChange} />
                                        </div>
                                        {/* <div className="mb-1 grid grid-cols-2 ">
                                            <label htmlFor="price" className=""><b> Price: </b></label>
                                            <input type='number' className={inputClass} name="price" id={`price${newPump._id}`} value={newPump.price} onChange={handleChange} />
                                        </div> */}
                                        {/* <p><b>KSB Invoice Data: </b>{formatDate(pump.KSBInvoiceDate)}</p> */}
                                        <div className='text-center'>
                                            <button className={btnClass} onClick={() => onDispatch()}>Dispatch</button>
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

export default ViewDispatchModal