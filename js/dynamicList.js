// Página dinâmica.
const rideListElement = document.getElementById("rideList");
// Receber o localStorege
const allRides = getAllRides();

allRides.forEach(([id, value]) => {
  const ride = JSON.parse(value);
  ride.id = id;

  // Cria a tag <li> adiciona o id para a tag e colocar um texto para ela.
  const itemElement = document.createElement("li");
  itemElement.id = ride.id;
  itemElement.innerText = ride.id;

  // Adiciona a tag criada, <li>, ao seu pai, <ul>.
  rideListElement.appendChild(itemElement);
});
