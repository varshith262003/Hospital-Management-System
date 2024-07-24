// src/components/HospitalDetails.jsx
import { useLocation } from 'react-router-dom';

const HospitalDetails = () => {
  const { state } = useLocation();
  const hospital = state.hospital;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Hospital Details</h2>
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <img src={hospital.image} alt={hospital.name} className="w-full lg:w-1/3 h-64 object-cover rounded-md shadow-md" />
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-semibold">{hospital.name}</h3>
          <p className="text-md text-gray-700">City: {hospital.city}</p>
          <p className="text-md text-gray-700">Speciality: {hospital.speciality}</p>
          <p className="text-md text-gray-700">Rating: {hospital.rating}</p>
          <p className="text-md text-gray-700">Number of Doctors: {hospital.numberOfDoctors}</p>
          <p className="text-md text-gray-700">Number of Departments: {hospital.numberOfDepartments}</p>
          <p className="text-md text-gray-700">Description: {hospital.description}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {hospital.images.map((image, index) => (
            <img key={index} src={image} alt={`hospital_image_${index}`} className="w-full h-48 object-cover rounded-md shadow-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
