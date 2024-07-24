// src/components/HospitalList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState('');
  const navigate = useNavigate();


  const fetchHospitals = async () => {
    try {
      const { data } = await axios.get(`https://hospitalserver-rose.vercel.app/api/v1/hospitals?city=${city}`);
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (hospital) => {
    navigate(`/hospital/${hospital._id}`, { state: { hospital } });
  };


  return (
    <div className="p-6">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full border-gray-300 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:border-0 p-2"
        />
        <button onClick={fetchHospitals} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Search</button>
      </div>

      <ul className="flex flex-wrap gap-4 justify-center ">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <li key={hospital._id} className="border-gray-300 border shadow-md rounded-lg p-3 flex gap-4 items-center w-64">
              <img src={hospital.image} alt={hospital.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex flex-col gap-1 flex-1 items-start">
                <h3 className="text-lg font-semibold">{hospital.name}</h3>
                <p className="text-sm text-gray-600 -mt-1">{hospital.city}</p>
                <p className="text-sm text-gray-600">Rating: {hospital.rating}</p>
                <div className="flex gap-2 justify-between w-full">
                  {/* <Link to={`/hospital/${hospital._id}`} className="text-blue-500 hover:underline">View</Link> */}
                  <button onClick={() => handleView(hospital)} className="text-blue-500 hover:underline">View</button>
                  <EditButton data={hospital} onEdit={() => fetchHospitals()} />
                  <DeleteButton id={hospital._id} onDelete={() => fetchHospitals()} />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No Hospitals found.</p>
        )}
      </ul>
    </div>
  );
};

export default HospitalList;
