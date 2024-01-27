import React, { useState } from 'react'
import ViewDismantleModal from '../Modals/PumpModals/ViewDismantleModal';

const DismantleCard = ({ pump, index }) => {

    const btnClass = 'px-5 py-2 border border-zinc-700 rounded-md mx-auto my-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500 w-fit'
    const inputClass = 'px-5 py-2 border border-sky-300 bg-sky-300 rounded-md m-2 '


    const [showDismantleModal, setShowDismantleModal] = useState(false)

    let admin = false;
    if (localStorage.getItem("token").includes("Admin")) {
        admin = true;
    }
    const closeDismantleModal = () => {
        setShowDismantleModal(!showDismantleModal);
    };

    return (
        <div className='flex text-center'>
            <div className='border-2 ml-4 w-[50px] p-4 border-sky-600'>{index + 1}</div>
            <div className={`mr-4 w-full border border-gray-500 rounded-md grid grid-cols-7`}>
                <div className='border p-4 border-sky-600'>{pump.pumpType} </div>
                <div className='border p-4 border-sky-600'>{pump.pumpSize} </div>
                <div className='border p-4 border-sky-600'>{pump.moc} </div>
                <div className='border p-4 border-sky-600'>{pump.so} </div>
                <div className='border p-4 border-sky-600'>{pump.seal} </div>
                <div className='border col-span-1 border-sky-600'>
                    <select className={`${inputClass} w-[170px] border  p-3 border-sky-400`}>
                        {pump.dismantleParts && pump.dismantleParts.map((part) =>
                            <option >{part} </option>
                        )}
                    </select>
                </div>
                {admin && <div className='grid w-fit m-auto'>

                    <button
                        className={btnClass}
                        onClick={() => { setShowDismantleModal(!showDismantleModal) }}
                    >Dismantle</button>
                </div>}
                <div>
                    {showDismantleModal && (
                        <ViewDismantleModal
                            clickHandler={closeDismantleModal}
                            check={'DismantlePump'}
                            isOpen={showDismantleModal}
                            pump={pump}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DismantleCard