const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetData } = require("./models/planets.model");

const server = http.createServer(app);

const PORT = process.env.PORT || 3500;

(async function startServer() {
  await mongoConnect();
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}`);
  });
})();
