import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';

const PumpCard = (props) => {
    const btnClass = 'px-2 py-1 h-10 border border-zinc-700 rounded-md text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);

    const { pump, handleFilterPump } = props
    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterPump();
    };
    const closeDispatchModal = () => {
        setShowDispatchModal(!showDispatchModal);
        handleFilterPump();
    };

    return (
        <div>
            <div className=' mx-4 border border-gray-500 rounded-md grid grid-cols-8'>
                <div className='border p-4 border-sky-600'>{pump.pumpType}</div>
                <div className='border p-4 border-sky-600'>{pump.pumpSize}</div>
                <div className='border p-4 border-sky-600'>{pump.moc}</div>
                <div className='border p-4 border-sky-600'>{pump.so}</div>
                <div className='border p-4 border-sky-600'>{pump.KSBInvoice}</div>
                <div className='border p-4 border-sky-600'>{formatDate(pump.KSBInvoiceDate)}</div>
                <div className='border p-4 border-sky-600'>{formatPrice(pump.price)}</div>
                {/* <button className={btnClass} onClick={ }>Dispatch</button> */}
                <div className='flex gap-x-1 m-auto'>
                    <button
                        className={btnClass}
                        onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                    >Update</button>
                    <button
                        className={btnClass}
                        onClick={() => setShowDispatchModal(!showDispatchModal)}
                    >Dispatch</button>
                </div>
                <div>
                    {showUpdateModal && (
                        <ViewUpdateModal
                            clickHandler={closeUpdateModal}
                            isOpen={showUpdateModal}
                            pump={pump}
                        />
                    )}
                </div>
                <div>
                    {showDispatchModal && (
                        <ViewDispatchModal
                            clickHandler={closeDispatchModal}
                            isOpen={showDispatchModal}
                            pump={pump}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PumpCard