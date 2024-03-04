import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/BearingModal/ViewUpdateModal';
import ViewDispatchModal from '../Modals/BearingModal/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';
import ViewCustSheetModal from '../Modals/BearingModal/ViewCustSheetModal';

const BearingCard = (props) => {
    const btnClass = 'p-1 h-8 m-1 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCustSheetModal, setShowCustSheetModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);

    const { bearing, handleFilterBearing, admin, index } = props

    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterBearing();
    };
    const closeCBModal = () => {
        setShowCustSheetModal(!showCustSheetModal);
        handleFilterBearing();
    };
    const closeDispatchModal = () => {
        setShowDispatchModal(!showDispatchModal);
        handleFilterBearing();
    };

    return (
        <div className='flex'>
            <div className='border-2 ml-4 p-4 m-0 border-sky-600 w-[50px]'>{index + 1}</div>
            <div className={`mr-4 w-full border border-gray-500 rounded-md grid ${(admin) ? 'grid-cols-7' : 'grid-cols-6  '}`}>
                <div className='border p-4 border-sky-600'>{bearing.bearingType}</div>
                <div className='border p-4 border-sky-600'>{bearing.bearing}</div>
                <div className='border p-4 border-sky-600'>{bearing.so}</div>
                <div className='border p-4 border-sky-600'>{bearing.KSBInvoice}</div>
                <div className='border p-4 border-sky-600'>{formatDate(bearing.KSBInvoiceDate)}</div>
                <div className='border p-4 border-sky-600'>{formatPrice(bearing.price)}</div>
                {admin && <div className='grid w-fit m-auto'>
                    <button
                        className={btnClass}
                        onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                    >Update</button>
                    <button
                        className={btnClass}
                        onClick={() => setShowCustSheetModal(!showCustSheetModal)}
                    >Book</button>
                    
                </div>}
            </div>
            <div>
                {showUpdateModal && (
                    <ViewUpdateModal
                        clickHandler={closeUpdateModal}
                        isOpen={showUpdateModal}
                        bearing={bearing}
                    />
                )}
            </div>
            <div>
                {showCustSheetModal && (
                    <ViewCustSheetModal
                        clickHandler={closeCBModal}
                        isOpen={showCustSheetModal}
                        bearing={bearing}
                    />
                )}
            </div>
            <div>
                {showDispatchModal && (
                    <ViewDispatchModal
                        clickHandler={closeDispatchModal}
                        check={'BearingCard'}
                        // deletePump={deletePump}
                        isOpen={showDispatchModal}
                        bearing={bearing}
                    />
                )}
            </div>
        </div>
    )
}

export default BearingCard
