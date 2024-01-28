const speedElement = document.getElementById("speed");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

let watchID = null;
let currentRide = null;

startBtn.addEventListener("click", () => {
  // Api do Navegador, serve para pegar as informações do dispositivo,
  //  como a localização.
  // Link documentação da API:
  //  https://developer.mozilla.org/pt-BR/docs/Web/API/Window/navigator

  if (watchID) return;

  function handleSuccess(position) {
    addPosition(currentRide, position);

    // Recebe a informação na variável `position`
    //  para a velocidade é `{variável}.coords.speed`
    speedElement.innerHTML = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1)
      : 0;
  }

  function handleError(error) {
    console.log(error.msg);
  }

  // Informações adicionais da API (Documentação)
  const option = { enableHighAccuracy: true };

  // Inicia a corrida.
  currentRide = createNewRide();
  watchID = navigator.geolocation.watchPosition(
    handleSuccess,
    handleError,
    option
  );

  // Remover/Adicionar os botões Start e Stop.
  startBtn.classList.add("d-none");
  stopBtn.classList.remove("d-none");
});

stopBtn.addEventListener("click", () => {
  if (!watchID) return;

  navigator.geolocation.clearWatch(watchID);
  watchID = null;

  // Finaliza a corrida.
  updateStopTime(currentRide);
  currentRide = null;

  // Remover/Adicionar os botões Stop e Start.
  stopBtn.classList.add("d-none");
  startBtn.classList.remove("d-none");

  window.location.href = "./";
});
