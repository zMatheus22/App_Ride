function createNewRide() {
  // A estrutura do armazenamento de dados.
  const rideID = Date.now();
  const rideRecord = {
    data: [],
    startTime: rideID,
    stopTime: null,
  };

  saveRideRecord(rideID, rideRecord);
  return rideID;
}

function getAllRides() {
  return Object.entries(localStorage);
}

function getRideRecord(rideID) {
  return JSON.parse(localStorage.getItem(rideID));
}

function saveRideRecord(rideID, rideRecord) {
  localStorage.setItem(rideID, JSON.stringify(rideRecord));
}

function addPosition(rideID, position) {
  // Recebe as informações da API.
  const rideRecord = getRideRecord(rideID);
  const newData = {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    timestamp: position.timestamp,
  };

  // Atualiza o localStorege e salva.
  rideRecord.data.push(newData);
  saveRideRecord(rideID, rideRecord);
}

function updateStopTime(rideID) {
  const rideRecord = getRideRecord(rideID);
  rideRecord.stopTime = Date.now();
  saveRideRecord(rideID, rideRecord);
}
