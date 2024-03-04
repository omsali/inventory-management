import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewDispatchModal from '../Modals/BearingModal/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';
import ViewCustUpdateModal from '../Modals/BearingModal/ViewCustUpdateModal';

const CustomerSheetCard = (props) => {
    const btnClass = 'p-1 h-8 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);

    const { bearing, index, handleFilterBearing } = props
    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterBearing();
    };
    const closeDispatchModal = () => {
        setShowDispatchModal(!showDispatchModal);
        handleFilterBearing();
    };

    return (
        <div className='flex text-center'>
            <div className='border-2 ml-4 p-4 m-0 border-sky-600 w-[50px]'>{index + 1}</div>
            <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-12`}>
                <div className='border p-4 border-sky-600 col-span-2'>{bearing.customerName}</div>
                <div className='border p-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>Bearing Type: </b> {bearing.bearingType}</div>
                    <div className=''><b className='font-semibold'>Bearing : </b> {bearing.bearing}</div>
                </div>
                <div className='border p-4 border-sky-600 col-span-2 break-words'>{bearing.so}</div>
                <div className='border p-4 border-sky-600 break-words'>{bearing.KSBInvoice}</div>
                <div className='border px-2 py-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>KSB Date: </b>{formatDate(bearing.KSBInvoiceDate)}</div>
                    <div className=''><b className='font-semibold'>Book Date: </b>{formatDate(bearing.AllotedDate)}</div>
                    <div className=''><b className='font-semibold'>Due Date: </b>{formatDate(bearing.DueDate)}</div>
                </div>
                <div className='border p-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>KSB Price: </b>{formatPrice(bearing.KSBPrice)}</div>
                    <div className=''><b className='font-semibold'>PPSS Price: </b>{formatPrice(bearing.PPPrice)}</div>
                </div>
                {/* <button className={btnClass} onClick={ }>Dispatch</button> */}
                {<div className='flex gap-y-2 m-auto flex-col'>
                    <button
                        className={btnClass}
                        onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                    >Update</button>
                    <button
                        className={btnClass}
                        onClick={() => setShowDispatchModal(!showDispatchModal)}
                    >Dispatch</button>
                </div>}
                <div>
                    {showUpdateModal && (
                        <ViewCustUpdateModal
                            clickHandler={closeUpdateModal}
                            isOpen={showUpdateModal}
                            bearing={bearing}
                        />
                    )}
                </div>
                <div>
                    {showDispatchModal && (
                        <ViewDispatchModal
                            clickHandler={closeDispatchModal}
                            isOpen={showDispatchModal}
                            bearing={bearing}
                            check={'CustSheet'}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomerSheetCard
