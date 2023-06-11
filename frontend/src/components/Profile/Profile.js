import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash, faRulerVertical, faWeight, faVenusMars, faIdCard, faEdit, faSave, faCopy } from '@fortawesome/free-solid-svg-icons';
import { deleteFitnessProfile, updateFitnessProfile } from '../../api/fitnessProfilesApi';
import './Profile.css';

const Profile = ({ profileData, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateFitnessProfile(editedProfileData);
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

  const handleDelete = () => {
    deleteFitnessProfile(profileData._id).then(() => {
    onDelete(profileData._id);
    });
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedProfileData.userId)
      .then(() => {
        // Success feedback here. For example, show a toast or a tooltip
        console.log('Copied to clipboard');
      })
      .catch(err => {
        // Failure feedback here. For example, show a toast or a tooltip
        console.log('Failed to copy text: ', err);
      });
  };

  return (
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
          <FontAwesomeIcon icon={faIdCard} />
          <p>
            <span>User ID:</span> {editedProfileData.userId}
            <button onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </p>
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
        <div className="button-container">
          {renderEditButton()}
          <button className="profile-delete-btn" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
  );
};

export default Profile;
