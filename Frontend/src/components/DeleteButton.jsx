/* eslint-disable react/prop-types */
// src/components/DeleteButton.jsx
import axios from 'axios';

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/hospitals/delete?id=${id}`);
        onDelete(id); // Notify parent component
        alert('Hospital deleted successfully'); 
      } catch (error) {
        console.error('Error deleting hospital:', error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
