const express = require("express");
const app = express();

const planetsRoute = require("./routes/planets/planets.router");

app.use(express.json());

/** ROUTES */
app.use("planets", planetsRoute);

/** /ROUTES */

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
  console.log(`HELLO`);
});

module.exports = app;
