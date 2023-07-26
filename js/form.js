import {addValidator, resetPristine, validatePristine} from './form-validate.js';
import {changeOriginalEffect, onEffectListChange, iniSlider} from './filters.js';
import {sendData } from './api.js';
import {renderFailMessage, renderSuccessMessage} from './messages.js';

const GET_URL = 'https://28.javascript.pages.academy/kekstagram';
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const effectsList = document.querySelector('.effects__list');

const onSendSuccess = () => {
  renderSuccessMessage();
  hideForm();
  submitButton.disabled = false;
};

const onSendFail = () => {
  renderFailMessage();
  submitButton.disabled = false;
};


const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape' && !evt.target.closest('.text__hashtags') &&
!evt.target.closest('.text__description')) {
    evt.preventDefault();
    hideForm();
  }

};
const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  iniSlider();
  changeOriginalEffect();
  effectsList.addEventListener('change', (onEffectListChange));
};

function hideForm() {
  effectsList.removeEventListener('change', onEffectListChange);
  form.reset();
  resetPristine();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCancelButtonclick = () => hideForm();
const onFileInputChange = () => showForm();
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (validatePristine()) {
    submitButton.disabled = true;
    sendData(GET_URL, onSendSuccess, onSendFail, new FormData(evt.target));
  }
};

const addFormChange = () => {
  fileField.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonclick);
  form.addEventListener('submit', onFormSubmit);
  addValidator();
};

export {addFormChange};
