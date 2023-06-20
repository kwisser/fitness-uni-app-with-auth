import axios from "./axios";

const FITNESS_DAY_URL = "/fitness/day";
const FITNESS_DAYS_URL = "/fitness/days";

export const fetchActivityForDayForProfileId = async (profileId, date) => {
  try {
    const { data } = await axios.get(`${FITNESS_DAY_URL}/${profileId}/${date}`);
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
    const { data } = await axios.get(`${FITNESS_DAYS_URL}/${profileId}`);
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
  try {
    data = renameIdField(data);
    delete data.dayId;
    const response = await axios.post(FITNESS_DAY_URL, data);
    console.log(response);
    return true;
  } catch (error) {
    console.error("Error posting FitnessDay Profile Data: ", error);
    throw error;
  }
};

export const updateFitnessDayForProfile = async (fitnessDayActivities) => {
  try {
    fitnessDayActivities = renameIdField(fitnessDayActivities);
    const response = await axios.put(FITNESS_DAY_URL, fitnessDayActivities);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating daily activities: ", error);
    throw new Error(`Error updating daily activities: ${error.message}`);
  }
};

  /* 
  renameIdField gets an object  which contains a list of daily exercise or/and food List {food: [], exercise: []}
  return ans object where dayId is added 
  */
const renameIdField = (inputObject) => {
  /*
  Wir nutzen die Destructuring Syntax von JavaScript, um die Eigenschaft '_id' aus dem inputObject zu extrahieren und in die Variable 'dayId' zu speichern.
  Alle übrigen Eigenschaften des inputObject werden in das 'rest'-Objekt gepackt.
  */
  const { _id: dayId, ...rest } = inputObject;
  /*
  Zeile gibt ein neues Objekt zurück, in dem dayId als Eigenschaft eingefügt ist und alle anderen Eigenschaften aus dem rest-Objekt hinzugefügt werden. 
  Die {...rest} Syntax steht hier für den Spread-Operator, der alle Eigenschaften des rest-Objekts in das neue Objekt einfügt.
  */
  return { dayId, ...rest };
};
