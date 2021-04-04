const express = require("express");

const { getUserImage } = require("./controllers/userImageController"); 
const app = express();
const PORT = 3000;

app.get("/avatar/:email", (req, res) => getUserImage(req, res));

app.listen(PORT, () => {
console.log(`Gravitar api is listnening on: localhost:${PORT}/`)
});
