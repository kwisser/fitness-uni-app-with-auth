import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faRulerVertical, faWeight, faVenusMars, faIdCard, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import './Profile.css';

const Profile = ({ profileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const convertProfileDataToUpdateJSON = (profileData) => {
    return {
      profileId: profileData._id,
      name: profileData.name,
      age: profileData.age,
      height: profileData.height,
      weight: profileData.weight,
      sex: profileData.sex,
      userId: profileData.userId,
    };
  };
  

  const handleSave = () => {
    console.log(editedProfileData);

    axios.put(`/fitness/profile`, convertProfileDataToUpdateJSON( editedProfileData))
      .then(response => {
        console.log(response);
        // Perform further actions after successful save if needed.
      })
      .catch(error => {
        console.log(error);
        // Perform error handling if needed.
      });

    setIsEditing(false);
    // Update the `profileData` with the new data
    setEditedProfileData(editedProfileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const renderEditButton = () => {
    if (isEditing) {
      return (
        <button className="profile-edit-btn" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} />
        </button>
      );
    } else {
      return (
        <button className="profile-edit-btn" onClick={handleEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      );
    }
  };

  const profileLink = `/profiles/${profileData._id}`;

  return (
    <Link to={profileLink} className="profile-link">
      <div className="profile-container">
        <h2 className="profile-title">Profile</h2>
        <div className="profile-item">
          <FontAwesomeIcon icon={faUser} />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProfileData.name}
              onChange={handleInputChange}
            />
          ) : (
            <p>
              <span>Name:</span> {editedProfileData.name}
            </p>
          )}
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faCalendar} />
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={editedProfileData.age}
              onChange={handleInputChange}
            />
          ) : (
            <p>
              <span>Age:</span> {editedProfileData.age}
            </p>
          )}
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faRulerVertical} />
          {isEditing ? (
            <input
              type="number"
              name="height"
              value={editedProfileData.height}
              onChange={handleInputChange}
            />
          ) : (
            <p>
              <span>Height:</span> {editedProfileData.height}
            </p>
          )}
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faWeight} />
          {isEditing ? (
            <input
              type="number"
              name="weight"
              value={editedProfileData.weight}
              onChange={handleInputChange}
            />
          ) : (
            <p>
              <span>Weight:</span> {editedProfileData.weight}
            </p>
          )}
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faVenusMars} />
          {isEditing ? (
            <select
              name="sex"
              value={editedProfileData.sex}
              onChange={handleInputChange}
            >
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          ) : (
            <p>
              <span>Sex:</span> {editedProfileData.sex}
            </p>
          )}
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faIdCard} />
          <p>
            <span>User ID:</span> {editedProfileData.userId}
          </p>
        </div>
        {renderEditButton()}
      </div>
    </Link>
  );
};

export default Profile;
