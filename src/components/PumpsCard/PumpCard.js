import React, { useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/PumpModals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/PumpModals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';
import ViewCustSheetModal from '../Modals/PumpModals/ViewCustSheetModal';
import ViewDismantleModal from '../Modals/PumpModals/ViewDismantleModal';

const PumpCard = (props) => {
    const btnClass = 'p-1 h-8 m-2 border border-zinc-700 rounded-md text-sm text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCustSheetModal, setShowCustSheetModal] = useState(false);
    // const [showDismantleModal, setShowDismantleModal] = useState(false);

    const { pump, handleFilterPump, admin, index } = props
    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterPump();
    };
    const closeCBModal = () => {
        setShowCustSheetModal(!showCustSheetModal);
        handleFilterPump();
    };
    // const closeDismantleModal = () => {
    //     setShowDismantleModal(!showDismantleModal);
    //     handleFilterPump();
    // };

    const deletePump = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/dismantledelete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const handleDismantle = async () => {
        const response = await fetch(`http://localhost:5000/api/v1/addtodismantle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pumpType: pump.pumpType,
                pumpSize: pump.pumpSize,
                so: pump.so,
                seal: pump.seal,
                moc: pump.moc,
            })
        });
        deletePump(pump._id);
        handleFilterPump();
    }

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
                {admin && <div className='grid w-fit m-auto'>
                    <button
                        className={btnClass}
                        onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                    >Update</button>
                    <button
                        className={btnClass}
                        onClick={() => setShowCustSheetModal(!showCustSheetModal)}
                    >Cust Sheet</button>
                    <button
                        className={btnClass}
                        onClick={handleDismantle}
                    >Dismantle</button>
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
                    {showCustSheetModal && (
                        <ViewCustSheetModal
                            clickHandler={closeCBModal}
                            isOpen={showCustSheetModal}
                            pump={pump}
                        />
                    )}
                </div>
                {/* <div>
                    {showDismantleModal && (
                        <ViewDismantleModal
                            clickHandler={closeDismantleModal}
                            isOpen={showDismantleModal}
                            pump={pump}
                        />
                    )}
                </div> */}
                {/* <div>
                    {showDispatchModal && (
                        <ViewDispatchModal
                            clickHandler={closeDispatchModal}
                            isOpen={showDispatchModal}
                            pump={pump}
                        />
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default PumpCard