const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangingColor);

let timerId = null;

function changeBackgroundColor() {
  const colorGenerate = getRandomHexColor();
  document.body.style.backgroundColor = colorGenerate;
}
function startChangeColor() {
  timerId = setInterval(changeBackgroundColor, 1000);
  startBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function stopChangingColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
}
