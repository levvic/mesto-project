import { openPicContainer, closePopup, openPopup } from './modal.js';
import { disableButton } from './validate.js';

const cardTemplate = document.querySelector('#card-template').content;
const popupAddCard = document.querySelector("#popup_add-card");
const addCardBtn = document.querySelector('.profile__add-card-btn');
const cardsList = document.querySelector('.location-cards');
const cardNameInput = popupAddCard.querySelector('input[name="name"]');
const cardLinkInput = popupAddCard.querySelector('input[name="link"]');
const formAddCard = document.querySelector('.form-card');
const buttonDisabledClass = 'form__save-btn_disabled';
const likeBtnActiveClass = 'location-card__like-btn_active';
const newCardSelector = '.location-card';
const newCardImgSelector = '.location-card__image';
const newCardNameSelector = '.location-card__name';
const likeBtnSelector = '.location-card__like-btn';
const deleteBtnSelector = '.location-card__delete-btn';

// photos
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

  const addInitialCards = () => initialCards.forEach(card => cardsList.prepend(createCard(card.name, card.link)));

  const createCard = (cardName, cardLink) => {
    const newCard = cardTemplate.querySelector(newCardSelector).cloneNode(true);
    const cardImg = newCard.querySelector(newCardImgSelector);
    const cardTitle = newCard.querySelector(newCardNameSelector);

    cardImg.src = cardLink;
    cardImg.alt = cardName;
    cardTitle.textContent = cardName;

    const likeBtn = newCard.querySelector(likeBtnSelector);
    likeBtn.addEventListener('click', toggleLikeBtn);
    const deleteBtn = newCard.querySelector(deleteBtnSelector);
    deleteBtn.addEventListener('click', deleteCard);
    cardImg.addEventListener('click', openPicContainer);

    return newCard;
  }

  const toggleLikeBtn = (evt) => evt.srcElement.classList.toggle(likeBtnActiveClass);

  const deleteCard = (evt) => evt.srcElement.parentNode.remove();

  const submitCardInfo = (evt) => {
    evt.preventDefault();
    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));
    cardNameInput.value = "";
    cardLinkInput.value = "";
    closePopup(popupAddCard);
    disableButton(evt.submitter, { buttonDisabledClass });
  };

  const openCardPopup = () => openPopup(popupAddCard);

  formAddCard.addEventListener('submit', submitCardInfo);
  addCardBtn.addEventListener('click', openCardPopup);

  export { addInitialCards, popupAddCard };
