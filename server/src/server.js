const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const { loadPlanetData } = require("./models/planets.model");

const server = http.createServer(app);

const MONGO_URI = `mongodb+srv://mrfouladi7:CeDg46st0ipLFtEq@nasacluster.abilhfo.mongodb.net/nasa?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3500;

(async function startServer() {
  await mongoose.connect(MONGO_URI);
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
})();

mongoose.connection.once("open", () => {
  console.log("Mongo DB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});
