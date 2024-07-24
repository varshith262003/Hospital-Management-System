/* eslint-disable react/prop-types */
// src/components/DeleteConfirmation.jsx
import axios from 'axios';

const DeleteConfirmation = ({ id, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/hospitals/delete?id=${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting hospital:', error);
    }
    onClose();
  };

  return (
    <div>
      <p>Are you sure you want to delete this hospital?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default DeleteConfirmation;
