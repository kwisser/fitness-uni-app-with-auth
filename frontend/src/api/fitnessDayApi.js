import axios from "./axios";

const GET_FITNESS_DAY_URL = "/fitness/day";

export const fetchActivityForDay = async (profileId, date) => {
  try {
    const { data } = await axios.get(`${GET_FITNESS_DAY_URL}/${profileId}/${date}`);

    // Prüfen, ob Daten in der Antwort vorhanden sind
    if (data && data.length > 0) {
      console.log("fetchActivityForDay: ", data[0]);
      return data[0];
    } else {
      // Setzen Sie die Zustände auf leere Arrays, wenn keine Daten vorhanden sind
      return null;
    }
  } catch (error) {
    // Fehler beim Abrufen der Daten
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
  }
};

export const insertFitnessDayForProfile = async (data) => {
  console.log("insertingFitnessDayForProfile: ", data);
  try {
    data = renameIdField(data);
    delete data.dayId;
    try {
      const response = await axios.post(GET_FITNESS_DAY_URL, data);
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    // Fehler beim Abrufen der Daten
    console.error("Es gab einen Fehler beim Posten der FitnessDay Profile Data: ", error);
  }
};

export const updateFitnessDayForProfile = async (data) => {
  console.log("updateFitnessDayForProfile: ", data);
  try {
    data = renameIdField(data);
    try {
      const response = await axios.put(GET_FITNESS_DAY_URL, data);
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    // Fehler beim Abrufen der Daten
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
  }
};

const renameIdField = (object) => {
  const { _id: dayId, ...rest } = object;
  console.log("renameIdField: ", { dayId, ...rest })
  return { dayId, ...rest };
};
