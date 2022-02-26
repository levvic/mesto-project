import { popupAddCard } from './card.js'


const popupEditProfile = document.querySelector("#popup_edit-profile");
const popupOpenPic = document.querySelector("#popup_pic");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const closeProfileFormBtn = document.querySelector("#close_edit-profile");
const closeCardFormBtn = document.querySelector("#close_add-card");
const closePictureBtn = document.querySelector("#close_show-pic");
const popupImg = document.querySelector('.pic-container__image');
const imgTitle = document.querySelector('.pic-container__caption');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.form-name');
const profileNameInput = popupEditProfile.querySelector('input[name="name"]');
const profileDescriptionInput = popupEditProfile.querySelector('input[name="description"]');


const openPicContainer = (evt) => {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  imgTitle.textContent = evt.target.alt;

  openPopup(popupOpenPic);
};

const openProfilePopup = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
}


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

const submitProfileInfo = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupEditProfile);
}

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');

    if(activePopup)
      closePopup(activePopup);
  }
}

editProfileBtn.addEventListener('click', openProfilePopup);
closeProfileFormBtn.addEventListener('click', () => closePopup(popupEditProfile));
closeCardFormBtn.addEventListener('click', () => closePopup(popupAddCard));
closePictureBtn.addEventListener('click', () => closePopup(popupOpenPic));

formEditProfile.addEventListener('submit', submitProfileInfo);


export { openPicContainer, closePopup, openPopup };
