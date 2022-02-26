import './index.css';
import enableValidation from './components/validate.js';
import { closePopup } from './components/modal.js';
import { addInitialCards } from './components/card.js';

const allModals = document.querySelectorAll('.popup');

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


allModals.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});
