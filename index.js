'use strict';

const getAirlines = require('./api/airlines.service').get();
const getProfiles = require('./api/profiles.service').get();
const getTrip = require('./api/trip.service').get();
let airlinesTable;
let profilesTable;

(async () => {
  const { airlines } = await getAirlines;

  airlinesTable = airlines.reduce((table, airline) => {
    table[airline.code] = airline.name;

    return table;
  }, {})
})();

(async () => {
  const { profiles } = await getProfiles;

  profilesTable = profiles.reduce((table, profile) => {
    const { personId, name, rewardPrograms } = profile;

    table[personId] = { name, rewardPrograms };

    return table;
  }, {})
})();

const makeTraveler = (id) => {
  const { name } = profilesTable[id];

  return {
    id,
    name,
    flights: []
  };
}

const makeLeg = (leg, id) => {
  const { airlineCode, flightNumber } = leg;
  const airlineName = airlinesTable[airlineCode];
  const frequentFlyerNumber = profilesTable[id].rewardPrograms.air[airlineCode]
    ? profilesTable[id].rewardPrograms.air[airlineCode]
    : '';

  return {
    airlineCode,
    airlineName,
    flightNumber,
    frequentFlyerNumber,
  }
}

const getTravelersFlightInfo = async () => {
  const { trip } = await getTrip;
  const travelers = [];
  const travelersAdded = {};

  trip.flights.forEach(flight => {
    const legAdded = {};

    flight.legs.forEach(leg => {
      flight.travelerIds.forEach(id => {

        if (travelersAdded[id] === undefined) {
          travelersAdded[id] = travelers.length;
          travelers.push(makeTraveler(id));
        }

        if (!legAdded[id]) {
          travelers[travelersAdded[id]].flights.push({ legs: [] });
          legAdded[id] = true;
        }

        const flightIdx = travelers[travelersAdded[id]].flights.length - 1;
        travelers[travelersAdded[id]].flights[flightIdx].legs.push(makeLeg(leg, id));
      });
    });
  });

  return ({ travelers });
}

module.exports = getTravelersFlightInfo;