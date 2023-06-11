import axios from '../api/axios';

const GET_PROFILES_URL = '/fitness/profiles';

const fetchProfileData = async () => {
    try {
      const response = await axios.get(GET_PROFILES_URL, {
      });
      console.log(response.data);
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  };

export default fetchProfileData;