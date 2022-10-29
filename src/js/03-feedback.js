import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputsChange), 500);
refs.form.addEventListener('submit', onSubmit);

loadStorageData();

function onInputsChange() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ email: refs.input.value, message: refs.textarea.value })
  );
}

function onSubmit(e) {
  e.preventDefault();
  console.log({ email: refs.input.value, message: refs.textarea.value });
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function loadStorageData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      let { email, message } = JSON.parse(savedData);
      refs.input.value = email;
      refs.textarea.value = message;
    }
  } catch (error) {
    console.error(error.message);
  }
}
