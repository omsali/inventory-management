import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/PumpModals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/PumpModals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';
import ViewCustSheetModal from '../Modals/PumpModals/ViewCustSheetModal';
import ViewDismantleModal from '../Modals/PumpModals/ViewDismantleModal';

const PumpCard = (props) => {
    const btnClass = 'p-1 h-8 m-1 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCustSheetModal, setShowCustSheetModal] = useState(false);
    const [showDismantleModal, setShowDismantleModal] = useState(false);

    const { pump, handleFilterPump, admin, index, deletePump } = props

    // const [submersible, setSubmersible] = useState(pump.sub);

    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterPump();
    };
    const closeCBModal = () => {
        setShowCustSheetModal(!showCustSheetModal);
        handleFilterPump();
    };
    const closeDismantleModal = () => {
        setShowDismantleModal(!showDismantleModal);
        handleFilterPump();
    };

    return (
        <div className='flex'>
            <div className='border-2 ml-4 p-4 m-0 border-sky-600 w-[50px]'>{index + 1}</div>
            {(!pump.sub && pump.sub === false) ? (
                <div className={`mr-4 w-full border border-gray-500 rounded-md grid ${(admin) ? 'grid-cols-9' : 'grid-cols-8  '}`}>
                    <div className='border p-4 border-sky-600'>{pump.pumpType}</div>
                    <div className='border p-4 border-sky-600'>{pump.pumpSize}</div>
                    <div className='border p-4 border-sky-600'>{pump.moc}</div>
                    <div className='border p-4 border-sky-600'>{pump.seal}</div>
                    <div className='border p-4 border-sky-600'>{pump.so}</div>
                    <div className='border p-4 border-sky-600'>{pump.KSBInvoice}</div>
                    <div className='border p-4 border-sky-600'>{formatDate(pump.KSBInvoiceDate)}</div>
                    <div className='border p-4 border-sky-600'>{formatPrice(pump.price)}</div>
                    {admin && <div className='grid w-fit m-auto'>
                        <button
                            className={btnClass}
                            onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                        >Update</button>
                        <button
                            className={btnClass}
                            onClick={() => setShowCustSheetModal(!showCustSheetModal)}
                        >Book</button>
                        <button
                            className={btnClass}
                            onClick={() => { setShowDismantleModal(!showDismantleModal) }}
                        >Dismantle</button>
                    </div>}
                </div>
            ) : (
                <div className={`mr-4 w-full border border-gray-500 rounded-md grid ${(admin) ? 'grid-cols-9' : 'grid-cols-8  '}`}>
                    <div className='border p-4 border-sky-600'>{pump.pumpType}</div>
                    <div className='border p-4 border-sky-600 col-span-3 break-words'>{pump.subDesc}</div>
                    <div className='border p-4 border-sky-600 break-words'>{pump.so}</div>
                    <div className='border p-4 border-sky-600 break-words'>{pump.KSBInvoice}</div>
                    <div className='border p-4 border-sky-600'>{formatDate(pump.KSBInvoiceDate)}</div>
                    <div className='border p-4 border-sky-600'>{formatPrice(pump.price)}</div>
                    {/* <button className={btnClass} onClick={ }>Dispatch</button> */}
                    {admin && <div className='grid w-fit m-auto'>
                        <button
                            className={btnClass}
                            onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                        >Update</button>
                        <button
                            className={btnClass}
                            onClick={() => setShowCustSheetModal(!showCustSheetModal)}
                        >Book</button>
                        {/* <button
                            className={btnClass}
                            onClick={() => { setShowDismantleModal(!showDismantleModal) }}
                        >Dismantle</button> */}
                    </div>}

                </div>
            )
            }
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
                {showCustSheetModal && (
                    <ViewCustSheetModal
                        clickHandler={closeCBModal}
                        isOpen={showCustSheetModal}
                        pump={pump}
                    />
                )}
            </div>
            <div>
                {showDismantleModal && (
                    <ViewDismantleModal
                        clickHandler={closeDismantleModal}
                        check={'PumpCard'}
                        deletePump={deletePump}
                        isOpen={showDismantleModal}
                        pump={pump}
                    />
                )}
            </div>
        </div>
    )
}

export default PumpCard