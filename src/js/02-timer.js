import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.css';
import { Report } from 'notiflix/build/notiflix-report-aio';


const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  dataDay: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStartEl.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
        return Report.failure('Date Failure', 'Please choose a date in the future', 'Okay');
    }
    refs.btnStartEl.removeAttribute('disabled');

    refs.btnStartEl.addEventListener('click', onStartTimer);

    function onStartTimer(event) {
      const timerInterval = setInterval(() => {
        const date = new Date();
        const difTime = selectedDates[0].getTime() - date.getTime();
        if (difTime <= 0) {
          return clearInterval(timerInterval);
        }

        refs.dataDay.textContent = addLeadingZero(convertMs(difTime).days);
        refs.dataHours.textContent = addLeadingZero(convertMs(difTime).hours);
        refs.dataMinutes.textContent = addLeadingZero(convertMs(difTime).minutes);
        refs.dataSeconds.textContent = addLeadingZero(convertMs(difTime).seconds);
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
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
  return  value.toString().padStart(2, '0');
}