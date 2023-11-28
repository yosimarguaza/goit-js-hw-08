import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Monitorizar el evento input en el formulario y escribir en el almacenamiento local
const saveToLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
}, 500);

form.addEventListener('input', saveToLocalStorage);

// Cuando la página se cargue, comprueba el estado del almacenamiento y rellena los campos del formulario
document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem(storageKey);

  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
});

// Al enviar el formulario, borra el almacenamiento y emite un objeto con los valores actuales a la consola
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value
  };

  console.log('Form Data:', formData);

  // Borra el almacenamiento
  localStorage.removeItem(storageKey);

  // Limpia los campos del formulario
  emailInput.value = '';
  messageTextarea.value = '';
});



// const throttle = requiere('lodash.throttle');
// const form = document.querySelector('.feedback-form');
// const inputEmail = form.querySelector('input[type=email]');
// const textarea = form.querySelector('textarea');
// const keyForm = 'feedback-form';
// const savekey = (key, value) => {
//     try {
//         const jsonValue = JSON.stringify(value);
//         localStorage.setItem(kye, jsonValue);
//     } catch (error) {
//         console.log(`Errir1: ${error.name} => ${error.message}`);
//     }
// };

// const loadKey = key => {
//     try {
//         const getKey = localStorage.setItem(key);
//         return getKey === null ? undefined : JSON.parse(getKey);
//     } catch (error) {
//         console.log(`Error: ${error.name} => ${error.message}`);
//     }
// }