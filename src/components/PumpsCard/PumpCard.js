import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';

const PumpCard = (props) => {
    const btnClass = 'p-1 h-8 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);

    const { pump, handleFilterPump, admin, index } = props
    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterPump();
    };
    const closeDispatchModal = () => {
        setShowDispatchModal(!showDispatchModal);
        handleFilterPump();
    };

    return (
        <div className='flex'>
            <div className='border-2 ml-4 p-4 m-0 border-sky-600 w-[50px]'>{index + 1}</div>
            <div className={`mr-4 w-full border border-gray-500 rounded-md grid ${(admin) ? 'grid-cols-9' : 'grid-cols-8  '}`}>
                <div className='border p-4 border-sky-600'>{pump.pumpType}</div>
                <div className='border p-4 border-sky-600'>{pump.pumpSize}</div>
                <div className='border p-4 border-sky-600'>{pump.moc}</div>
                <div className='border p-4 border-sky-600'>{pump.so}</div>
                <div className='border p-4 border-sky-600'>{pump.seal}</div>
                <div className='border p-4 border-sky-600'>{pump.KSBInvoice}</div>
                <div className='border p-4 border-sky-600'>{formatDate(pump.KSBInvoiceDate)}</div>
                <div className='border p-4 border-sky-600'>{formatPrice(pump.price)}</div>
                {/* <button className={btnClass} onClick={ }>Dispatch</button> */}
                {admin && <div className='flex gap-x-1 m-auto'>
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