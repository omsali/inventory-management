import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
// import ViewUpdateModal from '../Modals/PumpModals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/PumpModals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';
import ViewCustUpdateModal from '../Modals/PumpModals/ViewCustUpdateModal';

const DispatchCard = (props) => {
    const btnClass = 'p-1 h-8 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'

    const { pump, index } = props

    return (
        <div className='flex'>
            <div className='border-2 ml-4 p-4 m-0 border-sky-600 w-[50px]'>{index + 1}</div>
            <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-12`}>
                <div className='border p-4 border-sky-600 col-span-2'>{pump.customerName}</div>
                <div className='border p-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>Pump Type: </b> {pump.pumpType}</div>
                    <div className=''><b className='font-semibold'>Pump Size: </b> {pump.pumpSize}</div>
                    <div className=''><b className='font-semibold'>Pump MOC: </b> {pump.moc}</div>
                    <div className=''><b className='font-semibold'>Sealing: </b> {pump.seal}</div>
                </div>
                <div className='border p-4 border-sky-600 col-span-2'>{pump.so}</div>
                <div className='border p-4 border-sky-600 col-span-2'>{pump.PPInvoice}</div>
                <div className='border px-2 py-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>KSB Date: </b>{formatDate(pump.KSBInvoiceDate)}</div>
                    <div className=''><b className='font-semibold'>Due Date: </b>{formatDate(pump.AllotDate)}</div>
                    <div className=''><b className='font-semibold'>PPSS Date: </b>{formatDate(pump.PPInvoiceDate)}</div>
                </div>
                <div className='border p-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>KSB Price: </b>{formatPrice(pump.KSBPrice)}</div>
                    <div className=''><b className='font-semibold'>PPSS Price: </b>{formatPrice(pump.PPPrice)}</div>
                </div>
               
            </div>
        </div>
    )
}

export default DispatchCard