import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faRulerVertical, faWeight, faVenusMars, faIdCard } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

const Profile = ({ profileData }) => {
  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-item">
        <FontAwesomeIcon icon={faUser} />
        <p>
          <span>Name:</span> {profileData.name}
        </p>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faCalendar} />
        <p>
          <span>Age:</span> {profileData.age}
        </p>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faRulerVertical} />
        <p>
          <span>Height:</span> {profileData.height}
        </p>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faWeight} />
        <p>
          <span>Weight:</span> {profileData.weight}
        </p>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faVenusMars} />
        <p>
          <span>Sex:</span> {profileData.sex}
        </p>
      </div>
      <div className="profile-item">
        <FontAwesomeIcon icon={faIdCard} />
        <p>
          <span>User ID:</span> {profileData.userId}
        </p>
      </div>
    </div>
  );
};

export default Profile;
