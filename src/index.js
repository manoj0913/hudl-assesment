const express = require("express");

const { getUserImage } = require("./controllers/userImageController"); 
const app = express();
const PORT = 3000;

app.get("/avatar/:email", (req, res) => getUserImage(req, res));
app.get("/", (req, res) => res.send("Health check request acknowledged and api is running successfull."));

app.listen(PORT, () => {
console.log(`Gravitar api is listnening on: localhost:${PORT}/`)
});
