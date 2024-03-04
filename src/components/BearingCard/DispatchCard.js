import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import formatPrice from '../../Utils/FormatPrice';

const DispatchCard = (props) => {
    const btnClass = 'p-1 h-8 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'

    const { bearing, index } = props

    return (
        <div className='flex'>
            <div className='border-2 ml-4 p-4 m-0 border-sky-600 w-[50px]'>{index + 1}</div>
            <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-12`}>
                <div className='border p-4 border-sky-600 col-span-2'>{bearing.customerName}</div>
                <div className='border p-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>Bearing Type: </b> {bearing.bearingType}</div>
                    <div className=''><b className='font-semibold'>Bearing: </b> {bearing.bearing}</div>
                </div>
                <div className='border p-4 border-sky-600 col-span-2'>{bearing.so}</div>
                <div className='border p-4 border-sky-600 col-span-2'>{bearing.PPInvoice}</div>
                <div className='border px-2 py-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>KSB Date: </b>{formatDate(bearing.KSBInvoiceDate)}</div>
                    <div className=''><b className='font-semibold'>Booked Date: </b>{formatDate(bearing.AllotedDate)}</div>
                    <div className=''><b className='font-semibold'>Due Date: </b>{formatDate(bearing.DueDate)}</div>
                    <div className=''><b className='font-semibold'>PPSS Date: </b>{formatDate(bearing.PPInvoiceDate)}</div>
                </div>
                <div className='border p-4 border-sky-600 col-span-2'>
                    <div className=''><b className='font-semibold'>KSB Price: </b>{formatPrice(bearing.KSBPrice)}</div>
                    <div className=''><b className='font-semibold'>PPSS Price: </b>{formatPrice(bearing.PPPrice)}</div>
                </div>

            </div>
        </div>
    )
}

export default DispatchCard