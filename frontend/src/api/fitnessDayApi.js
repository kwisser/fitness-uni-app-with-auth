import axios from "./axios";

const GET_FITNESS_DAY_URL = "fitness/day";

export const fetchActivityForDay = async (profileId, date) => {
  try {
    const response = await axios.get(`${GET_FITNESS_DAY_URL}/${profileId}/${date}`);

    // Prüfen, ob Daten in der Antwort vorhanden sind
    if (response.data && response.data.length > 0) {
      console.log("############fetch day data############")
      console.log(response.data[0]);
      console.log("############fetch day data############")
      return response.data[0];
    } else {
      // Setzen Sie die Zustände auf leere Arrays, wenn keine Daten vorhanden sind
      return null;
    }
  } catch (error) {
    // Fehler beim Abrufen der Daten
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
  }
};

export const updateFitnessDayForProfile = async (profileId, date, data) => {
  try {
    data = renameIdField(data);
    console.log("############renamed data############")
    console.log(data);
    console.log("############renamed data############")
    axios.put(`fitness/day/`, data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    // Fehler beim Abrufen der Daten
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
  }
};

const renameIdField = (object) => {
  const { _id: dayId, ...rest } = object;
  return { dayId, ...rest };
};