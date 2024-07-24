/* eslint-disable react/prop-types */
// src/components/EditHospitalForm.jsx
import { useState } from 'react';
import axios from 'axios';
import LocalInput from './LocalInput';

const EditHospitalForm = ({ data, onEdit }) => {
  const hospital = data;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    description: hospital.description || '',
    images: hospital.images || [],
    numberOfDoctors: hospital.numberOfDoctors || 0,
    numberOfDepartments: hospital.numberOfDepartments || 0,
    rating: hospital.rating || '',
    image: hospital.image || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'images' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`https://hospitalserver-rose.vercel.app/v1/hospitals/update?id=${hospital._id}`, formData)
      .then(() => {
        alert('Hospital updated successfully');
        onEdit();
      })
      .catch((error) => {
        console.error('Error updating hospital:', error);
        alert('Error updating hospital. Please try again.');
      })
      .finally(() => setLoading(false));
  }

  if (!hospital) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <h2 className="text-lg font-semibold">Hospital Details</h2>
      <LocalInput type="text" name="name" value={hospital.name} disabled />
      <LocalInput type="text" name="city" value={hospital.city} disabled />
      <LocalInput type="text" name="speciality" value={hospital.speciality} disabled />

      <h2 className="text-lg font-semibold">Edit Hospital</h2>

      <LocalInput type="url" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      <LocalInput type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" min="0" max="5" step="0.1" />

      <div className="flex flex-col items-start w-full mb-4">
        <label htmlFor="description" className="font-medium text-sm">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border-gray-300 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:border-0 p-2"
        />
      </div>

      <div className="flex flex-col items-start w-full mb-4">
        <label htmlFor="images" className="font-medium text-sm">Images (comma-separated URLs)</label>
        <textarea
          type="text"
          id="images"
          name="images"
          value={formData.images.join(',')}
          onChange={handleChange}
          className="w-full border-gray-300 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none focus:border-0 p-2"
        />
      </div>

      <LocalInput type="number" name="numberOfDoctors" value={formData.numberOfDoctors} onChange={handleChange} placeholder="Number of Doctors" />
      <LocalInput type="number" name="numberOfDepartments" value={formData.numberOfDepartments} onChange={handleChange} placeholder="Number of Departments" />

      <button
        type="submit"
        className={`w-full py-2 px-4 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'cursor-wait bg-gray-500' : 'cursor-pointer bg-blue-500'}`}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
};

export default EditHospitalForm;
