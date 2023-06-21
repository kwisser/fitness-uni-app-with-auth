Für den Server wurde eine debug Funktion eingebaut die bei jeder Anfrage die Request in der Konsole ausgibt.
Änderung in server/routes/fitness/routes.js

    const debugRequest = (req) => {
        console.log({
            method: req.method,
            path: req.path,
            query: req.query,
            body: req.body,
            food: req.body.food,
            exercise: req.body.exercise
        })
    }

