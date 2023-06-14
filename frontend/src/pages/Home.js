import React from 'react';
import { useSelector } from 'react-redux';
import ProfileSelector from '../components/FitnessProfile/ProfileSelector';
import FitnessDay from '../components/FitnessDay/FitnessDay';
import { getCurrentDate } from '../utils/DateHelper';

const Home = () => {
  const selectedProfile = useSelector(state => state.profile);

  return (
    <div>
      <h1>Home</h1>
      <ProfileSelector />
      {selectedProfile ? (
        <div>
          <FitnessDay userId={selectedProfile._id} date={getCurrentDate()} />
        </div>
      ) : (
        <p>Kein Profil ausgewählt.</p>
      )}
    </div>
  );
};


export default Home;
