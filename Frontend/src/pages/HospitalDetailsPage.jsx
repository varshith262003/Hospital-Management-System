// src/pages/HospitalDetailsPage.jsx
import { useParams } from 'react-router-dom';
import HospitalDetails from '../components/HospitalDetails'; 

const HospitalDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <HospitalDetails id={id} />
    </div>
  );
};

export default HospitalDetailsPage;
