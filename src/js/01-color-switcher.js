const refs = {
  btnStartEl: document.querySelector('[data-start]'),
  btnStopEl: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
  randomColorInterval: null,

};

refs.btnStartEl.addEventListener('click', onStartRandomColor);
refs.btnStopEl.addEventListener('click', onStopRandomColor);

function onStartRandomColor(event) {
   refs.randomColorInterval = setInterval(() => {refs.bodyEl.style.backgroundColor = getRandomHexColor()}, 1000);
   refs.btnStartEl.disabled = 'true';
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function onStopRandomColor(event){
clearInterval(refs.randomColorInterval);
refs.btnStartEl.disabled = !'true';
refs.bodyEl.style.backgroundColor = '#fafafa';

}

