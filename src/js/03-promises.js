
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let formData = {};
let position = 0;
let isActiv = false;

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  createBtn: document.querySelector('button[type="submit"]'),
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onFormInput);
refs.createBtn.disabled = false;


function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  
}

function onSubmit(evt) {
  evt.preventDefault();
  
  const delay = Number(formData.step);
  let firstDelay = Number(formData.delay);

  
  if ((formData.delay && formData.step && formData.amount)) {
    
    if (isActiv) {
      return 
    }
    
    isActiv = true
    refs.form.removeEventListener('input', onFormInput);
      
    console.log("formData", formData);

    const intevalId = setInterval(() => {
      const amountPromises = formData.amount;
      position += 1;

      const notifyDelay = (firstDelay += delay) - delay;
      
      showPromiseResult(position, notifyDelay);

      if (Number(amountPromises) === position) {
        position = 0;
        isActiv = false;
        formData = {};
        clearInterval(intevalId);
        refs.form.addEventListener('input', onFormInput);

      }

    }, delay);
    
  }

  evt.currentTarget.reset();
}



function showPromiseResult(positionNumber, delayStep) {
  
  createPromise(positionNumber, delayStep)
    .then(({ position, delay }) => {
      onSuccess({ position, delay })
    })
    .catch(({ position, delay }) => {
      onFailure({ position, delay });
    });

}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    const firstDelay = formData.delay;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay, position });
        
      }

      else { reject({ position, delay, position }) };

    }, firstDelay)

  });

}


function onSuccess({ position, delay }) {
  Notify.success(`✅ Rejected promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}