import axios from '../api/axios';

const GET_PROFILES_URL = '/fitness/profiles';

const fetchProfileData = async () => {
  try {
    const response = await axios.get(GET_PROFILES_URL, {
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFitnessProfile = async (profile_id) => {
  axios.delete(`/fitness/profile/${profile_id}`)
      .then(response => {
      })
      .catch(error => {
        console.log(error);
      });
};

export const updateFitnessProfile = (newProfileData) => {
  axios.put(`/fitness/profile`, convertProfileDataToUpdateJSON(newProfileData))
    .then(response => {
      console.log(response);
      // Perform further actions after successful save if needed.
    })
    .catch(error => {
      console.log(error);
      // Perform error handling if needed.
    });
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



export default fetchProfileData;
