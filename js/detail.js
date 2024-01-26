// Pegar o id pela URL
const params = new URLSearchParams(window.location.search);
const rideID = params.get("id");
const ride = getRideRecord(rideID);

const dataDiv = document.getElementById("data");

document.addEventListener("DOMContentLoaded", async () => {
  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  const mapElement = document.createElement("div");
  mapElement.style = "width:100px; height:100px;";
  mapElement.className = "bg-dark rounded-4";

  const dataElement = document.createElement("div");
  dataElement.className = "flex-fill d-flex flex-column";

  const cityDiv = document.createElement("div");
  cityDiv.innerText = `City: ${firstLocationData.city} - ${firstLocationData.countryCode}`;
  cityDiv.className = "text-primary mb-2";
  dataElement.appendChild(cityDiv);

  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerHTML = `Max speed: ${getMaxSpeed(ride.data)} Km/h`;
  maxSpeedDiv.className = "h5";
  dataElement.appendChild(maxSpeedDiv);

  const distanceDiv = document.createElement("div");
  distanceDiv.innerHTML = `Distance: ${getDistance(ride.data)} Km`;
  dataElement.appendChild(distanceDiv);

  const durationDiv = document.createElement("div");
  durationDiv.innerHTML = `Durantion: ${getDuration(ride)}`;
  dataElement.appendChild(durationDiv);

  const dateDiv = document.createElement("div");
  dateDiv.innerHTML = getStartDate(ride);
  dateDiv.className = "text-secondary mt-2";
  dataElement.appendChild(dateDiv);

  dataDiv.appendChild(dataElement);
});
