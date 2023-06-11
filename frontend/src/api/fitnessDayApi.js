import axios from "./axios";

const fetchActivityForDay = async (profileId,date) => {
    try {
      const response = await axios.get(`fitness/day/${profileId}/${date}`);
  
      // Prüfen, ob Daten in der Antwort vorhanden sind
      if (response.data && response.data.length > 0) {
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

export default fetchActivityForDay;