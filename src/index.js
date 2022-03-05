import './index.css';
import enableValidation from './components/validate.js';
import { closePopup } from './components/modal.js';
import { addInitialCards } from './components/card.js';
import { getUserInfo } from './components/api.js'

const allModals = document.querySelectorAll('.popup');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const profilePictureElement = document.querySelector('.profile__picture');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  errorClass: 'error-message_visible',
  inputInvalidClass: 'form__input_invalid',
  buttonSelector: '.form__save-btn',
  buttonDisabledClass: 'form__save-btn_disabled'
}

enableValidation(validationConfig);

const addProfileInfo = () => {
  getUserInfo()
  .then(res => renderProfileInfo(res));
}

// add initial cards from server
addInitialCards();

//get profile info on page
addProfileInfo();


allModals.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

const renderProfileInfo = (user) => {
  profileNameElement.textContent = user.name;
  profileDescriptionElement.textContent = user.about;
  profilePictureElement.src = user.avatar;
}
