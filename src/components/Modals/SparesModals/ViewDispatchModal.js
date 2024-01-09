import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import { alertError, alertSuccess } from '../../Alert';

const ViewDispatchModal = ({ clickHandler, isOpen, spare }) => {
    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-2 my-6 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-2 border border-sky-400 bg-sky-100 rounded-md '

    const [newSpare, setNewSpare] = useState({
        pumpType: spare.pumpType,
        pumpSize: spare.pumpSize,
        spareType: spare.spareType,
        moc: spare.moc,
        qty: "",
        PPInvoice: "",
        PPInvoiceDate: spare.KSBInvoiceDate,
        price: "",
    });

    // const handleDelete = async (id) => {
    //     console.log(id);
    //     const response = await fetch(`http://localhost:5000/api/v1/dispatchpump/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     // alertSuccess("Dispatched Sucessfully");
    // };

    const onDispatch = async () => {
        if (newSpare.qty <= spare.qty) {
            const response = await fetch(`http://localhost:5000/api/v1/dispatchspare`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pumpType: newSpare.pumpType,
                    pumpSize: newSpare.pumpSize,
                    spareType: newSpare.spareType,
                    moc: newSpare.moc,
                    qty: newSpare.qty,
                    price: newSpare.price,
                    PPInvoice: newSpare.PPInvoice,
                    PPInvoiceDate: newSpare.PPInvoiceDate
                })
            });
            if (newSpare.qty == spare.qty) {
                console.log("in delete")
                const response = await fetch(`http://localhost:5000/api/v1/dispatch/${spare._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log("response is",response)
            } else {
                const resp = await fetch(`http://localhost:5000/api/v1/updatespare/${spare._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        newqty: spare.qty - newSpare.qty
                    })
                });
            }
            closeModal();
            if (response.status === 201) {
                alertSuccess("Dispatched Sucessfully");
            }
            else {
                alertError("Dispatch Failed");
            }
        } else {
            alertError("Cannot Dispatch (Dispatch Quantity exceeds Instock Quntity")
        }
    };


    const closeModal = () => {
        clickHandler();
    };

    const handleChange = (e) => {
        setNewSpare({ ...newSpare, [e.target.name]: e.target.value })
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            {/* {console.log("Old qty",spare.qty)}
            {console.log("New qty",newSpare.qty)} */}
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
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>Pump Type: </b>{newSpare.pumpType}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>Pump Size: </b>{newSpare.pumpSize}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>Spare Type: </b>{newSpare.spareType}
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <b>MOC: </b>{newSpare.moc}
                                        </div>

                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="qty" className=""><b> Quantity to Dispatch: </b></label>
                                            <input type="number" className={inputClass} id={`qty${newSpare._id}`} name="qty" value={newSpare.qty} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="KSBInvoice" className=""><b> PPSS Invoice: </b></label>
                                            <input type="text" className={inputClass} id={`invoice${newSpare._id}`} name="PPInvoice" value={newSpare.PPInvoice} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="KSBInvoiceDate" className=""><b> PPSS Invoice Date: </b></label>
                                            <input type="date" className={inputClass} id={`date${newSpare._id}`} name="PPInvoiceDate" value={newSpare.PPInvoiceDate} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 grid grid-cols-2 ">
                                            <label htmlFor="price" className=""><b> Price: </b></label>
                                            <input type='number' className={inputClass} name="price" id={`price${newSpare._id}`} value={newSpare.price} onChange={handleChange} />
                                        </div>
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