// Página dinâmica.

const rideListElement = document.getElementById("rideList");
// Receber o localStorege
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
  const ride = JSON.parse(value);
  ride.id = id;

  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  // Cria a tag <li> adiciona o id e colocar as informações da corrida.
  const itemElement = document.createElement("li");
  itemElement.id = ride.id;

  const cityDiv = document.createElement("div");
  cityDiv.innerText = `City: ${firstLocationData.city} - ${firstLocationData.countryCode}`;
  itemElement.appendChild(cityDiv);

  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerHTML = `Max speed: ${getMaxSpeed(ride.data)} Km/h`;
  itemElement.appendChild(maxSpeedDiv);

  const distanceDiv = document.createElement("div");
  distanceDiv.innerHTML = `Distance: ${getDistance(ride.data)} Km`;
  itemElement.appendChild(distanceDiv);

  const durationDiv = document.createElement("div");
  durationDiv.innerHTML = `Time: ${getDuration(ride)}`;
  itemElement.appendChild(durationDiv);

  const dateDiv = document.createElement("div");
  dateDiv.innerHTML = getStartDate(ride);
  itemElement.appendChild(dateDiv);

  // Adiciona a tag criada, <li>, ao seu pai, <ul>.
  rideListElement.appendChild(itemElement);
});

// Documentação para a API de Localização: https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api
async function getLocationData(latitude, longitude) {
  const URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&${longitude}&localityLanguage=en`;

  const response = await fetch(URL);

  return await response.json();
}

function getMaxSpeed(positions) {
  let maxSpeed = 0;
  positions.forEach((position) => {
    if (position.speed != null && position.speed > maxSpeed) {
      maxSpeed = position.speed;
    }
  });

  // Transformando o m/s em Km/h
  return (maxSpeed * 3.6).toFixed(1);
}

function getDuration(ride) {
  function format(number, digits) {
    return String(number.toFixed(0)).padStart(digits, "0");
  }

  const interval = (ride.stopTime - ride.startTime) / 1000; // em segundos.
  const minutes = Math.trunc(interval / 60);
  const seconds = interval % 60;

  return `${format(minutes, 2)}:${format(seconds, 2)}`;
}

function getStartDate(ride) {
  const date = new Date(ride.startTime);

  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  const hour = date.toLocaleString("en-US", { hour: "2-digit", hour12: false });
  const min = date.toLocaleString("en-US", { minute: "2-digit" });

  return `${hour}:${min} - ${month} ${day}, ${year}`;
}

// Documentação para cálculo de distância https://www.movable-type.co.uk/scripts/latlong.html
function getDistance(positions) {
  const earthRadiusKm = 6371;
  let totalDistance = 0;

  for (let i = 0; i < positions.length - 1; i++) {
    const position_X = {
      latitude: positions[i].latitude,
      longitude: positions[i].longitude,
    };
    const position_Y = {
      latitude: positions[i + 1].latitude,
      longitude: positions[i + 1].longitude,
    };

    // Pegando a diferença, e transformando em radianos.
    const deltaLatitude = toRad(position_Y.latitude - position_X.latitude);
    const deltaLongitude = toRad(position_Y.longitude - position_X.longitude);

    // Cálculo para verificar a distância percorrida.
    const a =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.cos(toRad(position_X.latitude)) *
        Math.cos(toRad(position_Y.latitude)) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c; // em metro

    totalDistance += distance;
  }

  function toRad(degree) {
    return (degree * Math.PI) / 180;
  }

  return totalDistance.toFixed(2);
}
