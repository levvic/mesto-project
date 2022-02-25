import { openPicContainer, closePopup, openPopup } from './modal.js';

const popupAddCard = document.querySelector("#popup_add-card");
const addCardBtn = document.querySelector('.profile__add-card-btn');
const cardsList = document.querySelector('.location-cards');
const cardNameInput = popupAddCard.querySelector('input[name="name"]');
const cardLinkInput = popupAddCard.querySelector('input[name="link"]');
const formAddCard = document.querySelector('.form-card');

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
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.querySelector('.location-card').cloneNode(true);
    const cardImg = newCard.querySelector('.location-card__image');
    const cardTitle = newCard.querySelector('.location-card__name');

    cardImg.src = cardLink;
    cardImg.alt = cardName;
    cardTitle.textContent = cardName;

    const likeBtn = newCard.querySelector('.location-card__like-btn');
    likeBtn.addEventListener('click', toggleLikeBtn);
    const deleteBtn = newCard.querySelector('.location-card__delete-btn');
    deleteBtn.addEventListener('click', deleteCard);
    cardImg.addEventListener('click', openPicContainer);

    return newCard;
  }

  const toggleLikeBtn = (evt) => evt.srcElement.classList.toggle("location-card__like-btn_active");

  const deleteCard = (evt) => evt.srcElement.parentNode.remove();


  const submitCardInfo = (evt) => {
    evt.preventDefault();
    cardsList.prepend(createCard(cardNameInput.value, cardLinkInput.value));
    cardNameInput.value = "";
    cardLinkInput.value = "";
    closePopup(popupAddCard);
  }

  const openCardPopup = () => openPopup(popupAddCard);

  formAddCard.addEventListener('submit', submitCardInfo);
  addCardBtn.addEventListener('click', openCardPopup);

  export { addInitialCards, popupAddCard };
