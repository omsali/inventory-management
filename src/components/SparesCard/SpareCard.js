import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/SparesModals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';

const SpareCard = (props) => {
    const btnClass = 'px-1 py-1 h-10 border border-zinc-700 rounded-md text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);

    const { spare, handleFilterSpare } = props
    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterSpare();
    };
    const closeDispatchModal = () => {
        setShowDispatchModal(!showDispatchModal);
        handleFilterSpare();
    };


    return (
        <div>
            <div className=' mx-4 border border-gray-500 rounded-md grid grid-cols-9'>
                <div className='border p-4 border-sky-600 text-center'>{spare.pumpType}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.pumpSize}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.spareType}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.moc}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.qty}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.KSBInvoice}</div>
                <div className='border p-4 border-sky-600 text-center'>{formatDate(spare.KSBInvoiceDate)}</div>
                <div className='border p-4 border-sky-600 text-center'>{formatPrice(spare.price)}</div>
                {/* <button className={btnClass} onClick={ }>Dispatch</button> */}
                <div className='flex gap-x-1 m-auto'>
                    <button
                        className={btnClass}
                        onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                    >Update</button>
                    <button
                        className={btnClass}
                        // onClick={() => setShowDispatchModal(!showDispatchModal)}
                    >Dispatch</button>
                </div>
                <div>
                    {showUpdateModal && (
                        <ViewUpdateModal
                            clickHandler={closeUpdateModal}
                            isOpen={showUpdateModal}
                            spare={spare}
                        />
                    )}
                </div>
                {/* <div>
                    {showDispatchModal && (
                        <ViewDispatchModal
                            clickHandler={closeDispatchModal}
                            isOpen={showDispatchModal}
                            spare={spare}
                        />
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default SpareCard