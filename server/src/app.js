const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const planetsRoute = require("./routes/planets/planets.router");
const launchesRoute = require("./routes/launches/launches.route");

/**MIDDLEWARES */
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
/** /MIDDLEWARES */

/** ROUTES */
app.use("/planets", planetsRoute);
app.use("/launches", launchesRoute);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

/** /ROUTES */

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
  console.log(`HELLO`);
});

module.exports = app;
