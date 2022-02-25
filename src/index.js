import './index.css';
import enableValidation from './components/validate.js';
import { addInitialCards } from './components/card.js';

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  errorClass: 'error-message_visible',
  inputInvalidClass: 'form__input_invalid',
  buttonSelector: '.form__save-btn',
  buttonDisabledClass: 'form__save-btn_disabled'
}

enableValidation(validationConfig);

addInitialCards();
