import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timeSelector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', updateTimer);
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateInputDate(selectedDates[0]);
  },
};

const dateSelector = flatpickr(timeSelector, options);
console.log(dateSelector);

function validateInputDate(selectedDates) {
  if (selectedDates < new Date()) {
    window.alert('Please choose a date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

function updateTimer() {
  let timeDifferenceMs = new Date(timeSelector.value) - Date.now();
  const timeDifferenceObject = convertMs(timeDifferenceMs);
  spanDays.textContent =  addLeadingZero(timeDifferenceObject.days);
  spanHours.textContent = timeDifferenceObject.hours;
  spanMinutes.textContent = timeDifferenceObject.minutes;
  spanSeconds.textContent = timeDifferenceObject.seconds;
  const timerStart = setInterval(() => {
    timeDifferenceMs -= 1000;
    if(timeDifferenceMs <= 0){
      clearInterval(timerStart)
      return
    }
    const timeDifferenceObject = convertMs(timeDifferenceMs);
    spanDays.textContent = addLeadingZero(timeDifferenceObject.days);
    spanHours.textContent = addLeadingZero(timeDifferenceObject.hours);
    spanMinutes.textContent = addLeadingZero(timeDifferenceObject.minutes);
    spanSeconds.textContent = addLeadingZero(timeDifferenceObject.seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
