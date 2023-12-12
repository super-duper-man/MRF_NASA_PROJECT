const launchesDatabase = require("./launches.mongo");
const launches = new Map();

let latestFlightNumber = 100;

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

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  try {
    await launchesDatabase.updateOne(
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

function addNewLine(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["Danny Company, NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existLaunchWithId,
  getAllLaunches,
  addNewLine,
  abortLaunchById,
};
