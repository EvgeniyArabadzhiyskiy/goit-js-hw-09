//-------------- ВАРИАНТ №2   CLASS TIMER--------------

import { Timer } from './class-timer';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/02-timer.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStart);
disabledStartBtn(true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    timer.choosesDates(selectedDates);
  },

  onClose(selectedDates) {
    timer.selectedData = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

function onStart() {
  const countdownTime = timer.getCountdownTime();
  timer.turnsOnTimer(countdownTime);
  disabledStartBtn(true);
}

const timer = new Timer({
  onTick: updateUI,
  onConvert: convertMs,
  onDisebled: disabledStartBtn,
});



//-------Функция Disabled кнопка START--------------
function disabledStartBtn(boolean) {
  refs.startBtn.disabled = boolean;
}

// ---------Функция обновления интерфейса таймера----------
function updateUI({ days, hours, minutes, seconds }) {
  refs.spanDays.textContent = days;
  refs.spanHours.textContent = hours;
  refs.spanMinutes.textContent = minutes;
  refs.spanSeconds.textContent = seconds;
}

//----------Функция конвертации "ms" в дни, часы, минуты, секунды-----------
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

//-----------Функция добавления "0" перед числом из одного символа--------
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}









//------------ВАРИАНТ №1     БЕЗ ПРИМЕНЕНИЯ CLASS -----------------------

// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import '../css/02-timer.css'

// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   spanDays: document.querySelector('span[data-days]'),
//   spanHours: document.querySelector('span[data-hours]'),
//   spanMinutes: document.querySelector('span[data-minutes]'),
//   spanSeconds: document.querySelector('span[data-seconds]'),
// }

// refs.startBtn.disabled = true;

// const options = {

//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onChange(selectedDates) {
//     const time = selectedDates[0] - Date.now()

//     if (time > 0) {
//       refs.startBtn.disabled = false;

//     }
//     else {refs.startBtn.disabled = true;}

//   },

//   onClose(selectedDates) {
//     const time = selectedDates[0] - Date.now()

//     if (time > 0) {
//       const date1 = Date.now()

//       refs.startBtn.addEventListener('click', onClick);

//       function onClick() {
//         refs.startBtn.disabled = true;

//         const intervalID = setInterval(() => {

//           const date2 = Date.now()
//           const deltaTime = date2 - date1;
//           const getTime = time - deltaTime;

//           const getConvertTime = convertMs(getTime)
//           console.log(convertMs(getTime));

//           updateTimerFace(getConvertTime)

//           function updateTimerFace({ days, hours, minutes, seconds }) {
//             refs.spanDays.textContent = days;
//             refs.spanHours.textContent = hours;
//             refs.spanMinutes.textContent = minutes;
//             refs.spanSeconds.textContent = seconds;

//           }

//           if (getTime < 1000) {
//             clearInterval(intervalID);

//           }

//         },1000)

//       }

//       refs.startBtn.disabled = false;

//     }
//     else {
//       Notify.failure('Please choose a date in the future');

//     }

//   },
// };

// const timer = flatpickr("#datetime-picker", options)

// function convertMs(ms) {

//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };

// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
