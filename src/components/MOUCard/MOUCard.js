import React, { useState } from 'react'
import ViewUpdateModal from '../Modals/MOUModal/ViewUpdateModal';
import { alertError, alertSuccess } from '../Alert';

const MOUCard = ({ edit, mou, f }) => {

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        f();
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/v1/deletemou/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alertSuccess("Delete Sucessfully");
        }
        else {
            alertError("Delete Failed");
        }
        f();
    }

    return (
        <div className='flex '>
            {(edit) && <div className='border border-sky-700 w-20'>
                <button onClick={() => setShowUpdateModal(!showUpdateModal)}>edit</button>
                <button onClick={() => handleDelete(mou._id)}>delete</button>
            </div>}
            <div className='grid grid-cols-12 text-center place-items-stretch w-full'>
                {console.log(edit)}
                <div className='text-center border border-sky-700 rounded-sm  col-span-2'>{mou.pumpType}</div>
                <div className='text-center border border-sky-700 rounded-sm '>{mou.totalQty}</div>
                <div className='text-center border border-sky-700 rounded-sm '>{mou.quarters[0].quarterSellQty + mou.quarters[1].quarterSellQty + mou.quarters[2].quarterSellQty + mou.quarters[3].quarterSellQty}</div>
                <div className='text-center border border-sky-700 rounded-sm '>{mou.quarters[0].quarterTarget}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[0].quarterSellQty}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[1].quarterTarget}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[1].quarterSellQty}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[2].quarterTarget}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[2].quarterSellQty}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[3].quarterTarget}</div>
                <div className='text-center border border-sky-700 rounded-sm'>{mou.quarters[3].quarterSellQty}</div>
            </div>
            <div>
                {showUpdateModal && (
                    <ViewUpdateModal
                        clickHandler={closeUpdateModal}
                        isOpen={showUpdateModal}
                        mou={mou}
                    />
                )}
            </div>
        </div>
    )
}

export default MOUCard