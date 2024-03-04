import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';
import formatDate from '../../../Utils/FormatDate';

const ViewDispatchModal = ({ clickHandler, isOpen, bearing, check }) => {
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md '

    const [newBearing, setNewBearing] = useState({
        PPInvoice: "",
        PPInvoiceDate: bearing.KSBInvoiceDate,
        price: 0,
    });

    const closeModal = () => {
        clickHandler();
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/deletecustbearing/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // alertSuccess("Dispatched Sucessfully");
    };

    const onDispatch = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/dispatchbearing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName: bearing.customerName,
                bearingType: bearing.bearingType,
                bearing: bearing.bearing,
                so: bearing.so,
                KSBPrice: bearing.KSBPrice,
                PPPrice: bearing.PPPrice,
                PPInvoice: newBearing.PPInvoice,
                AllotedDate: bearing.AllotedDate,
                DueDate: bearing.DueDate,
                KSBInvoiceDate: bearing.KSBInvoiceDate,
                PPInvoiceDate: newBearing.PPInvoiceDate
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
                                        Dispatch Bearing
                                    </Dialog.Title>
                                    <div className="text-lg">
                                    {console.log(check)}
                                        <div className="">
                                                <div className="mb-1 grid grid-cols-2 ">
                                                    <b>Customer Name: </b>{bearing.customerName}
                                                </div>
                                            
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Bearing Type: </b>{bearing.bearingType}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Bearing: </b>{bearing.bearing}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>SO: </b>{bearing.so}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>KSB Price: </b>{bearing.KSBPrice}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>PPSS Price: </b>{bearing.PPPrice}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <b>Alloted Date: </b>{formatDate(bearing.DueDate)}
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <label htmlFor="KSBInvoice" className=""><b> PPSS Invoice: </b></label>
                                            <input type="text" className={inputClass} id={`invoice${newBearing._id}`} name="PPInvoice" value={newBearing.PPInvoice} onChange={handleChange} />
                                        </div>
                                        <div className="mb-1 grid grid-cols-2 ">
                                            <label htmlFor="KSBInvoiceDate" className=""><b> PPSS Invoice Date: </b></label>
                                            <input type="date" className={inputClass} id={`date${newBearing._id}`} name="PPInvoiceDate" value={newBearing.PPInvoiceDate} onChange={handleChange} />
                                        </div>
                                        {/* <div className="mb-1 grid grid-cols-2 ">
                                            <label htmlFor="price" className=""><b> Price: </b></label>
                                            <input type='number' className={inputClass} name="price" id={`price${newBearing._id}`} value={newBearing.price} onChange={handleChange} />
                                        </div> */}
                                        {/* <p><b>KSB Invoice Data: </b>{formatDate(bearing.KSBInvoiceDate)}</p> */}
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