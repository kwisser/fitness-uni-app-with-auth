import axios from '../axiosInstance';

const GET_PROFILES_URL = '/fitness/profiles';
const FITNESS_PROFILE_URL = '/fitness/profile';

const fetchProfileData = async () => {
  try {
    const response = await axios.get(GET_PROFILES_URL, {
    });
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFitnessProfile = async (profileId) => {
  try{
    const response = await axios.delete(`${FITNESS_PROFILE_URL}/${profileId}`)
    if(response){
      console.log("deletedFitnessProfile" + JSON.stringify(response.data));
      return response.data;
    }
  }catch (error) {
    console.error("Es gab einen Fehler beim Löschen eines Profils: ", error);
    throw error;
  }
};

export const updateFitnessProfile = async (updatedFitnessProfile) => {
  try{
    const response = await axios.put(FITNESS_PROFILE_URL, convertProfileDataToUpdateJSON(updatedFitnessProfile))
    console.log("updatedFitnessProfile" + JSON.stringify(response.data));
    return response.data;
  }catch (error) {
    console.error("Es gab einen Fehler beim Aktualisieren eines Profils: ", error);
    throw error;
  }
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
