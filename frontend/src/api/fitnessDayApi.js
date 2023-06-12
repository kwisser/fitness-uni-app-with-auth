import axios from "./axios";

const GET_FITNESS_DAY_URL = "fitness/day";

const fetchActivityForDay = async (profileId, date) => {
  try {
    const response = await axios.get(`${GET_FITNESS_DAY_URL}/${profileId}/${date}`);

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

const updateFitnessDay = async (profileId, date, data) => {
  try {
    var raw = JSON.stringify({
      "dayId": "60618014853a921edccb8fc3",
      "date": "2932021",
      "food": [
        {
          "foodId": "60617e76853a921edccb8fbd",
          "amount": 500
        }
      ],
      "exercise": [
        {
          "exerciseId": "60617ef3853a921edccb8fbe",
          "timeInMinutes": 120
        }
      ],
      "profileId": "60617f5a853a921edccb8fbf"
    });

    axios.put(`fitness/day/${profileId}/${date}`, raw)
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

export default fetchActivityForDay;