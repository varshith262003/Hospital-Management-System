// FloatingActionButton.jsx
import { useState } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import HospitalCreationForm from './HospitalCreationForm';


const FloatingActionButton = () => {
  const [showModal, setShowModal] = useState(false);
  const handleToggle = () => setShowModal(!showModal);

  const ref = useClickAway(() => {
    if (showModal) {
      setShowModal(false);
    }
  });

  return (
    <>

      <button className='fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        onClick={handleToggle}
      >
        Add Hospital
      </button>
      {showModal && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
          <div ref={ref} className='bg-white p-6 rounded-lg shadow-md max-w-lg w-full'>
            <div className='relative'>
              <HospitalCreationForm />
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default FloatingActionButton;
