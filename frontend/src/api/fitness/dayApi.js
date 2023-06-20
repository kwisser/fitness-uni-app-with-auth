/** Functions zu communicate with fitness/day/ Endpoint */

import axios from "../axiosInstance";

const FITNESS_DAY_URL = "/fitness/day";
const FITNESS_ALL_DAYS_URL = "/fitness/days";


/**
 * fetchFitnessActivityForSpecificDayForProfile ist eine asynchrone Funktion, die die Fitnessaktivitäten eines bestimmten Profils an einem bestimmten Tag abruft.
 * 
 * @param {string} profileId - Die ID des Profils, für das die Aktivitäten abgerufen werden sollen.
 * @param {string} date - Das Datum, an dem die Aktivitäten stattfanden, im Format "yyyy-mm-dd".
 *
 * @returns {Object|null} Die Funktion gibt das erste Objekt der Daten zurück, die als Antwort auf die GET Anfrage erhalten wurden, falls vorhanden.
 * Wenn keine Daten gefunden wurden, gibt die Funktion null zurück.
 * Im Fehlerfall wirft die Funktion den aufgetretenen Fehler.
 *
 * @throws {Error} Wirft einen Error, wenn beim Versuch, die Aktivitäten abzurufen, ein Fehler auftritt.
 */

export const fetchFitnessActivityForSpecificDayForProfile = async (profileId, date) => {
  try {
    const { data } = await axios.get(`${FITNESS_DAY_URL}/${profileId}/${date}`);
    // Prüfen, ob Daten in der Antwort vorhanden sind
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
    throw error;
  }
};


/**
 * fetchAllActivitiesForProfile ist eine asynchrone Funktion, die alle Fitnessaktivitäten für ein bestimmtes Profil abruft.
 * 
 * @param {string} profileId - Die ID des Profils, für das die Aktivitäten abgerufen werden sollen.
 *
 * @returns {Array|null} Die Funktion gibt das erste Objekt der Daten zurück, die als Antwort auf die GET Anfrage erhalten wurden, falls vorhanden.
 * Wenn keine Daten gefunden wurden, gibt die Funktion null zurück.
 * Im Fehlerfall wirft die Funktion den aufgetretenen Fehler.
 *
 * @throws {Error} Wirft einen Error, wenn beim Versuch, die Aktivitäten abzurufen, ein Fehler auftritt.
 */

export const fetchAllActivitiesForProfile = async (profileId) => {
  try {
    const { data } = await axios.get(`${FITNESS_ALL_DAYS_URL}/${profileId}`);
    // Prüfen, ob Daten in der Antwort vorhanden sind
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.error("Es gab einen Fehler beim Abrufen der täglichen Aktivitäten: ", error);
    throw error;
  }
};


/**
 * insertFitnessDayForProfile ist eine asynchrone Funktion, die neue Fitnessaktivitäten für einen Benutzer hinzufügt.
 * 
 * @param {Object} fitnessDayActivities - Ein Objekt, das die Fitnessaktivitäten des Benutzers enthält.
 * Der Funktion ist es egal, welche spezifischen Aktivitäten im `fitnessDayActivities` Objekt enthalten sind, 
 * da alle Aktivitäten direkt an die POST Anfrage weitergegeben werden.
 *
 * @returns {Object} Die Funktion gibt die Daten zurück, die als Antwort auf die POST Anfrage erhalten wurden.
 * Im Erfolgsfall sollten diese Daten die neu eingefügten Fitnessaktivitäten enthalten.
 * Im Fehlerfall wirft die Funktion einen Fehler mit einer spezifischen Fehlermeldung, die den aufgetretenen Fehler beschreibt.
 *
 * @throws {Error} Wirft einen Error, wenn beim Versuch, die Aktivitäten hinzuzufügen, ein Fehler auftritt.
 * Der geworfene Fehler enthält eine Nachricht, die den spezifischen Fehler beschreibt.
 */

export const insertFitnessDayForProfile = async (fitnessDayActivities) => {
  try {
    const response = await axios.post(FITNESS_DAY_URL, fitnessDayActivities);
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while trying to post FitnessDay Profile Data: ", error);
    throw new Error(`Error posting FitnessDay Profile Data: ${error.message}`);
  }
};


/**
 * updateFitnessDayForProfile ist eine asynchrone Funktion, die einen Post Request ausführt und die Fitnessaktivitäten
 * für einen Tag für einen Benutzer aktualisiert.
 * 
 * @param {Object} fitnessDayActivities - Ein Objekt, das die Fitnessaktivitäten des Benutzers enthält. 
 * Es wird davon ausgegangen, dass dieses Objekt ein `_id` Feld enthält, welches vor dem Senden der Anfrage 
 * in `dayId` umbenannt wird.
 *
 * Der Funktion ist es egal, welche spezifischen Aktivitäten im `fitnessDayActivities` Objekt enthalten sind, 
 * da alle Aktivitäten direkt an die PUT Anfrage weitergegeben werden.
 *
 * @returns {Object} Die Funktion gibt die Daten zurück, die als Antwort auf die PUT Anfrage erhalten wurden.
 * Im Erfolgsfall sollten diese Daten die aktualisierten Fitnessaktivitäten enthalten.
 * Im Fehlerfall wirft die Funktion einen Fehler mit einer spezifischen Fehlermeldung, die den aufgetretenen Fehler beschreibt.
 *
 * @throws {Error} Wirft einen Error, wenn beim Versuch, die Aktivitäten zu aktualisieren, ein Fehler auftritt.
 * Der geworfene Fehler enthält eine Nachricht, die den spezifischen Fehler beschreibt.
 */

export const updateFitnessDayForProfile = async (fitnessDayActivities) => {
  try {
    fitnessDayActivities = renameObjectIdToDayId(fitnessDayActivities);
    const response = await axios.put(FITNESS_DAY_URL, fitnessDayActivities);
    // Nur den Status und die Daten der Antwort loggen
    console.log("Response Status: ", response.status);
    console.log("Response Data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while trying to update daily activities: ", error);
    throw new Error(`Error updating daily activities: ${error.message}`);
  }
};

/** 
renameIdField gets an object  which contains a list of daily exercise or/and food List {food: [], exercise: []}
return ans object where dayId is added 
*/
const renameObjectIdToDayId = (inputObjectContainingListOfFoodAndListOfExercises) => {
  // Wir nutzen die Destructuring Syntax von JavaScript, um die Eigenschaft '_id' aus dem inputObject zu extrahieren und in die Variable 'dayId' zu speichern.
  // Alle übrigen Eigenschaften des inputObject werden in das 'rest'-Objekt gepackt.
  const { _id: dayId, ...rest } = inputObjectContainingListOfFoodAndListOfExercises;
  // Zeile gibt ein neues Objekt zurück, in dem dayId als Eigenschaft eingefügt ist und alle anderen Eigenschaften aus dem rest-Objekt hinzugefügt werden. 
  // Die {...rest} Syntax steht hier für den Spread-Operator, der alle Eigenschaften des rest-Objekts in das neue Objekt einfügt.
  return { dayId, ...rest };
};
