const express = require("express");
const app = express();
const PORT = 4141;

app.get("/avatar/:email", (req, res) => "Fetched image successfully");

app.listen(PORT, () => {
console.log(`Gravitar api is listnening on: localhost:${PORT}/`)
});
