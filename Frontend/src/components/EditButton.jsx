/* eslint-disable react/prop-types */
import { useClickAway } from "@uidotdev/usehooks";
import { useState } from 'react';
import EditHospitalForm from './EditHospitalForm';


const EditButton = ({ data, onEdit }) => {

    const [showModal, setShowModal] = useState(false);
    const handleToggle = () => setShowModal(!showModal);

    const ref = useClickAway(() => {
        if (showModal) {
            setShowModal(false);
        }
    });

    return (
        <>
            <button
                onClick={handleToggle}
                className="text-yellow-500 hover:text-yellow-700"
            >
                Edit
            </button>
            {showModal && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
                    <div ref={ref} className='bg-white p-6 rounded-lg shadow-md max-w-lg w-full h-[90vh] overflow-y-auto'>
                        <EditHospitalForm data={data} onEdit={onEdit} />
                    </div>
                </div>
            )}
        </>
    );
};

export default EditButton;
