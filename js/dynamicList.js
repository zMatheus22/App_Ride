// Página dinâmica.

const rideListElement = document.getElementById("rideList");
// Receber o localStorege
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
  const ride = JSON.parse(value);
  ride.id = id;

  // Cria a tag <li> adiciona o id e colocar as informações da corrida.
  const itemElement = document.createElement("li");
  itemElement.id = ride.id;
  itemElement.className =
    "d-flex p-1 align-items-center justify-content-between shadow-sm mb-2 gap-3";

  // Adiciona a tag criada, <li>, ao seu pai, <ul>.
  rideListElement.appendChild(itemElement);

  itemElement.addEventListener("click", () => {
    window.location.href = `./detail.html?id=${ride.id}`;
  });

  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  const mapID = `map:${ride.id}`;
  const mapElement = document.createElement("div");
  mapElement.id = mapID;
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

  itemElement.appendChild(mapElement);
  itemElement.appendChild(dataElement);

  // API map - https://leafletjs.com/
  const map = L.map(mapID, {
    attributionControl: false,
    scrollWheelZoom: false,
    zoomControl: false,
    dragging: false,
  });
  map.setView([firstPosition.latitude, firstPosition.longitude], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 5,
    maxZoom: 18,
    ext: "png",
  }).addTo(map);

  L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);
});
