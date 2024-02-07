import React, { useEffect, useState } from 'react'
import formatDate from '../../Utils/FormatDate'
import ViewUpdateModal from '../Modals/SparesModals/ViewUpdateModal';
import ViewDispatchModal from '../Modals/SparesModals/ViewDispatchModal';
import formatPrice from '../../Utils/FormatPrice';
import ViewDismantleModal from '../Modals/SparesModals/ViewDismantleModal';
import axios from 'axios';

const SpareCard = (props) => {
    const api = axios.create({
        baseURL: 'http://localhost:5000', // Set your backend server address here
    });

    const btnClass = ' px-1 py-1 border border-zinc-700 rounded-md text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500'
    const inputClass = 'px-5 py-2 border border-sky-400 bg-sky-100 rounded-md w-52  '


    const [pumps, setPumps] = useState([])
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDispatchModal, setShowDispatchModal] = useState(false);
    const [showDismantleModal, setShowDismantleModal] = useState(false);
    const [filteredPumps, setFilteredPumps] = useState([])
    const { spare, handleFilterSpare, index } = props

    useEffect(() => {
        api.get('api/v1/getdismantlepumps').then((response) => {
            setPumps(response.data.pumps);
        });
    }, []);

    const closeUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal);
        handleFilterSpare();
    };
    const closeDispatchModal = () => {
        setShowDispatchModal(!showDispatchModal);
        handleFilterSpare();
    };
    const closeDismantleModal = () => {
        setShowDismantleModal(!showDismantleModal);
        handleFilterSpare();
    };

    const handleDismantle = () => {
        const filterByType = pumps.filter((pump) => {
            let arr = [];
            return (
                (!spare.pumpType || pump.pumpType === spare.pumpType) &&
                (!spare.pumpSize || pump.pumpSize === spare.pumpSize)
                // (!spare.spareType || pump.dismantleParts.map((part) => {
                //     if(part === spare.spareType){
                //         arr.push(part);
                //     }
                // }))
            )
        })
        setFilteredPumps(filterByType);
        setShowDismantleModal(!showDismantleModal);
    }


    return (
        <div className='flex'>
            <div className='border-2 ml-4 w-[50px] p-4 border-sky-600'><b>{index + 1} </b></div>
            <div className=' mr-4 w-full border border-gray-500 rounded-md grid grid-cols-10'>
                <div className='border p-4 border-sky-600 text-center'>{spare.pumpType}</div>
                <div className='border p-4 border-sky-600 text-center'>
                    <div>{spare.pumpBB}</div>
                    <div>{spare.pumpSize}</div>
                </div>
                <div className='border p-4 border-sky-600 text-center'>{spare.spareType}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.moc}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.so}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.qty}</div>
                <div className='border p-4 border-sky-600 text-center'>{spare.KSBInvoice}</div>
                <div className='border p-4 border-sky-600 text-center'>{formatDate(spare.KSBInvoiceDate)}</div>
                <div className='border p-4 border-sky-600 text-center'>{formatPrice(spare.price)}</div>
                {/* <button className={btnClass} onClick={ }>Dispatch</button> */}
                <div className='grid grid-row-2 gap-y-1 m-auto'>
                    <button
                        className={btnClass}
                        onClick={() => { setShowUpdateModal(!showUpdateModal) }}
                    >Update</button>
                    <button
                        className={btnClass}
                        onClick={() => setShowDispatchModal(!showDispatchModal)}
                    >Dispatch</button>
                    <button
                        className={btnClass}
                        onClick={handleDismantle}
                    >Dismantle</button>
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
                <div>
                    {showDispatchModal && (
                        <ViewDispatchModal
                            clickHandler={closeDispatchModal}
                            isOpen={showDispatchModal}
                            spare={spare}
                        />
                    )}
                </div>
                <div>
                    {showDismantleModal && (
                        <ViewDismantleModal
                            clickHandler={closeDismantleModal}
                            isOpen={showDismantleModal}
                            spare={spare}
                            pumps={filteredPumps}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SpareCard