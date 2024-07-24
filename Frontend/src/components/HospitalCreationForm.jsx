/* eslint-disable react/prop-types */
// HospitalCreationForm.jsx
import { useState } from 'react';
import axios from 'axios';
import Select from "react-tailwindcss-select";
import LocalInput from './LocalInput';

const HospitalCreationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    speciality: [],
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const options = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "oncology", label: "Oncology" },
    { value: "gynecology", label: "Gynecology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "dermatology", label: "Dermatology" },
    { value: "ophthalmology", label: "Ophthalmology" },
    { value: "urology", label: "Urology" },
    { value: "psychiatry", label: "Psychiatry" }
  ];

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('https://hospitalserver-rose.vercel.app/api/v1/hospitals/create', formData)
      .then(() => {
        alert('Hospital added successfully');
        setFormData({
          name: '',
          city: '',
          image: '',
          speciality: [],
          rating: ''
        });
      })
      .catch((error) => {
        console.error('Error adding hospital:', error);
        alert('Error adding hospital. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const [selected, setSelected] = useState(null);
  const handleSelect = (value) => {
    setSelected(value);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <LocalInput type='text' name="name" value={formData.name} onChange={handleChange} placeholder="Hospital Name" required />
      <LocalInput type='text' name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
      <LocalInput type='url' name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      <Select value={selected} onChange={handleSelect} options={options} isMultiple isSearchable placeholder="Select Specialities" />
      <LocalInput type='number' name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" min="0" max="5" step="0.1" />
      <button
        type="submit"
        className={`text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'} ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

    </form>
  );
};

export default HospitalCreationForm;
