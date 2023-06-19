import axios from "./axios";

const GET_FITNESS_DAY_URL = "/fitness/day";
const GET_FITNESS_DAYS_URL = "/fitness/days";

export const fetchActivityForDayForProfileId = async (profileId, date) => {
  try {
    const { data } = await axios.get(`${GET_FITNESS_DAY_URL}/${profileId}/${date}`);
    // Prüfen, ob Daten in der Antwort vorhanden sind
    if (data && data.length > 0) {
      return data[0];
    }
    return [];
  } catch (error) {
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
  }
};

export const fetchAllActivitysForProfileId = async (profileId) => {
  try {
    const { data } = await axios.get(`${GET_FITNESS_DAYS_URL}/${profileId}`);
    // Prüfen, ob Daten in der Antwort vorhanden sind
    if (data && data.length > 0) {
      return data[0];
    }
    return [];
  } catch (error) {
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
  }
};

export const insertFitnessDayForProfile = async (data) => {
  console.log("Inserting FitnessDayForProfile: ", data);
  try {
    data = renameIdField(data);
    delete data.dayId;
    const response = await axios.post(GET_FITNESS_DAY_URL, data);
    console.log(response);
    return true;
  } catch (error) {
    console.error("Error posting FitnessDay Profile Data: ", error);
    throw error; // Throw the error so the calling function can handle it
  }
};

export const updateFitnessDayForProfile = async (data) => {
  console.log("Updating FitnessDayForProfile: ", data);
  try {
    data = renameIdField(data);
    const response = await axios.put(GET_FITNESS_DAY_URL, data);
    console.log(response);
    return true;
  } catch (error) {
    console.error("Error updating daily activities: ", error);
    throw error; // Throw the error so the calling function can handle it
  }
};


const renameIdField = (object) => {
  const { _id: dayId, ...rest } = object;
  console.log("renameIdField: ", { dayId, ...rest })
  return { dayId, ...rest };
};
