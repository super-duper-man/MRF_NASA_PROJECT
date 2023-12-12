const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "MRF"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function existLaunchWithId(launchId) {
  const launch = await launchesDatabase.findOne({ flightNumber: launchId });
  return launch;
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) throw new Error("No matching planet found");

  try {
    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
  } catch (error) {
    console.log(error);
  }
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Danny Company, NASA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

// function addNewLine(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customer: ["Danny Company, NASA"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
  return aborted.matchedCount === 1 && aborted.modifiedCount === 1;
}

module.exports = {
  existLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
