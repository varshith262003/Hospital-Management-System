// src/pages/Home.jsx
import FloatingActionButton from '../components/FloatingActionButton';
import HospitalList from '../components/HospitalList';

const Home = () => (
  <div className='md:max-w-4xl md:p-6 flex flex-col gap-6 mx-auto mt-6 p-3'>
    <h1 className='text-3xl font-semibold text-center '>Hospital Management</h1>
    {/* <HospitalCreationForm /> */}
    <HospitalList />
    <FloatingActionButton />
  </div>
);

export default Home;
