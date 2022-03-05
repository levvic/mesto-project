import { openPicContainer, closePopup, openPopup } from "./modal.js";
import { disableButton } from "./validate.js";
import { getCards, postCard, getUserInfo } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const popupAddCard = document.querySelector("#popup_add-card");
const addCardBtn = document.querySelector(".profile__add-card-btn");
const cardsList = document.querySelector(".location-cards");
const cardNameInput = popupAddCard.querySelector('input[name="name"]');
const cardLinkInput = popupAddCard.querySelector('input[name="link"]');
const formAddCard = document.querySelector(".form-card");
const buttonDisabledClass = "form__save-btn_disabled";
const likeBtnActiveClass = "location-card__like-btn_active";
const newCardSelector = ".location-card";
const newCardImgSelector = ".location-card__image";
const newCardNameSelector = ".location-card__name";
const likeBtnSelector = ".location-card__like-btn";
const deleteBtnSelector = ".location-card__delete-btn";
const numberOfLikes = ".location-card__like-number";

const addInitialCards = () => {
  const getUserPromise = getUserInfo();
  const getCardsPromise = getCards();
  const promises = [getUserPromise, getCardsPromise];

  Promise.all(promises)
  .then((results) => {
    const userId = results[0]._id;
    const cards = results[1];
    cards.forEach((card) => cardsList.prepend(createCard(card.name, card.link, card.likes.length, card.owner._id === userId)))
  });
};

const createCard = (cardName, cardLink, likeNmbr = 0, createdByMe = true) => {
  const newCard = cardTemplate.querySelector(newCardSelector).cloneNode(true);
  const cardImg = newCard.querySelector(newCardImgSelector);
  const cardTitle = newCard.querySelector(newCardNameSelector);

  cardImg.src = cardLink;
  cardImg.alt = cardName;
  cardTitle.textContent = cardName;

  const likes = newCard.querySelector(numberOfLikes);
  likes.textContent = likeNmbr;
  const likeBtn = newCard.querySelector(likeBtnSelector);
  likeBtn.addEventListener("click", toggleLikeBtn);
  const deleteBtn = newCard.querySelector(deleteBtnSelector);
  // user can delete only his own cards
  if(createdByMe)
  {
    deleteBtn.addEventListener("click", deleteCard);
  }
  else
  {
    deleteBtn.style.display = "none";
  }

  cardImg.addEventListener("click", openPicContainer);

  return newCard;
};

const toggleLikeBtn = (evt) =>
  evt.srcElement.classList.toggle(likeBtnActiveClass);

const deleteCard = (evt) => evt.srcElement.parentNode.remove();

const submitCardInfo = (evt) => {
  evt.preventDefault();

  postCard(cardNameInput.value, cardLinkInput.value).then((res) => {
    cardsList.prepend(createCard(res.name, res.link));
  });

  cardNameInput.value = "";
  cardLinkInput.value = "";
  closePopup(popupAddCard);
  disableButton(evt.submitter, { buttonDisabledClass });
};

const openCardPopup = () => openPopup(popupAddCard);

formAddCard.addEventListener("submit", submitCardInfo);
addCardBtn.addEventListener("click", openCardPopup);

export { addInitialCards, popupAddCard };
