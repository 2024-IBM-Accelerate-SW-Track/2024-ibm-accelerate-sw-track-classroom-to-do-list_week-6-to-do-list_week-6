const express = require("express"),
      app = express(),
      port = process.env.PORT || 8080,
      cors = require("cors");
const bodyParser = require('body-parser');
const fsPromises = require("fs").promises;
const todoDBName = "tododb";
const useCloudant = false;

// Init code for Cloudant
// Initialize backend
app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (request, response) => {
    response.send({ message: "Connected to Backend server!" });
});

app.post("/add/item", addItem);

async function addItem (request, response) {
    try {
        const id = request.body.jsonObject.id;
        const task = request.body.jsonObject.task;
        const curDate = request.body.jsonObject.currentDate;
        const dueDate = request.body.jsonObject.dueDate;
        const newTask = {
          ID: id,
          Task: task,
          Current_date: curDate,
          Due_date: dueDate
        };

        if (useCloudant) {
            // Begin here for Cloudant
        } else {
            const data = await fsPromises.readFile("database.json");
            const json = JSON.parse(data);
            json.push(newTask);
            await fsPromises.writeFile("database.json", JSON.stringify(json));
            console.log('Successfully wrote to file');
        }
        response.sendStatus(200);
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
}

// Route to get all items
app.get("/get/items", async (request, response) => {
    try {
        const data = await fsPromises.readFile("database.json");
        const json = JSON.parse(data);
        response.json(json);
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
});

// Route to search items
app.get("/get/searchitem", async (request, response) => {
    const query = request.query.q;
    try {
        const data = await fsPromises.readFile("database.json");
        const json = JSON.parse(data);
        const results = json.filter(item => item.Task.includes(query));
        response.json(results);
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
});
