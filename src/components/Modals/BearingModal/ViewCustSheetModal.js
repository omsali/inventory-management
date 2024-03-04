import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import formatDate from '../../../Utils/FormatDate';

const ViewCustSheetModal = ({ clickHandler, isOpen, bearing }) => {

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md '

    const [newBearing, setNewBearing] = useState({
        dispatchPrice: 0,
        customerName: "",
        dueDate: "",
    });

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/deletebearing/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // alertSuccess("Dispatched Sucessfully");
    };

    const onDispatch = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/bearingcustomerdispatch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bearingType: bearing.bearingType,
                bearing: bearing.bearing,
                so: bearing.so,
                KSBPrice: bearing.price,
                KSBInvoice: bearing.KSBInvoice,
                KSBInvoiceDate: bearing.KSBInvoiceDate,
                customerName: newBearing.customerName,
                PPPrice: newBearing.dispatchPrice,
                DueDate: newBearing.dueDate,
                AllotedDate: Date()
            })
        });
        await handleDelete(bearing._id);
        closeModal();
        if (response.status === 201) {
            alertSuccess("Dispatched Sucessfully");
        }
        else {
            alertError("Dispatch Failed");
        }
    };

    const closeModal = () => {
        clickHandler();
    };

    const handleChange = (e) => {
        setNewBearing({ ...newBearing, [e.target.name]: e.target.value })
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
                                        Add Bearing to Customer Book Sheet
                                    </Dialog.Title>
                                    <div className="text-lg">
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>Bearing Type: </b>{bearing.bearingType}
                                        </div>

                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>Bearing: </b>{bearing.bearing}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>SO: </b>{bearing.so}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>KSB Price: </b>{bearing.price}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>KSB Invoice: </b>{bearing.KSBInvoice}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>KSB Invoice Date: </b>{formatDate(bearing.KSBInvoiceDate)}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="customerName" className=""><b> Customer Name: </b></label>
                                            <input type="text" className={inputClass} id={`date${newBearing._id}`} name="customerName" value={newBearing.customerName} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="DueDate" className=""><b> Due Date: </b></label>
                                            <input type="date" className={inputClass} id={`date${newBearing._id}`} name="dueDate" value={newBearing.dueDate} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="PPprice" className=""><b>PPSS Price: </b></label>
                                            <input type='number' className={inputClass} name="dispatchPrice" id={`price${newBearing._id}`} value={newBearing.PPprice} onChange={handleChange} />
                                        </div>
                                        <div className='text-center'>
                                            <button className={btnClass} onClick={() => onDispatch()}>Add</button>
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

export default ViewCustSheetModal