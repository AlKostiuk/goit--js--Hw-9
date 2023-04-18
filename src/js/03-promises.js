const form = document.querySelector('.form');
const formElements = form.elements;
const delay = formElements['delay'];
const step = formElements['step'];
const amount = formElements['amount'];

form.addEventListener('submit', handlePromiseCreator);

function handlePromiseCreator(event) {
  event.preventDefault();
  const startingDelay = parseInt(delay.value);
  let currentDelay = startingDelay;

  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += parseInt(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, position + delay);
  });
}
