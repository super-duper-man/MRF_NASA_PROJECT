const express = require("express");
const app = express();
const cors = require("cors");

const planetsRoute = require("./routes/planets/planets.router");

/**MIDDLEWARES */
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
/** /MIDDLEWARES */

/** ROUTES */
app.use("/planets", planetsRoute);

/** /ROUTES */

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
  console.log(`HELLO`);
});

module.exports = app;
