import { openPicContainer, closePopup, openPopup } from "./modal.js";
import { disableButton } from "./validate.js";
import {
  getCards,
  postCard,
  getUserInfo,
  deleteCard,
  putLike,
  deleteLike,
} from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const popupAddCard = document.querySelector("#popup_add-card");
const addCardBtn = document.querySelector(".profile__add-card-btn");
const cardsList = document.querySelector(".location-cards");
const cardNameInput = popupAddCard.querySelector('input[name="name"]');
const cardLinkInput = popupAddCard.querySelector('input[name="link"]');
const newCardSubmitButton = popupAddCard.querySelector(".form__save-btn");
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

  Promise.all(promises).then((results) => {
    const userId = results[0]._id;
    const cards = results[1];
    cards.forEach((card) =>
      cardsList.prepend(
        createCard(
          card.name,
          card.link,
          card._id,
          card.likes.some((like) => like._id === userId),
          card.likes.length,
          card.owner._id === userId
        )
      )
    );
  });
};

const createCard = (
  cardName,
  cardLink,
  cardId,
  likedByMe = false,
  likeNmbr = 0,
  createdByMe = true
) => {
  const newCard = cardTemplate.querySelector(newCardSelector).cloneNode(true);
  const cardImg = newCard.querySelector(newCardImgSelector);
  const cardTitle = newCard.querySelector(newCardNameSelector);

  newCard.setAttribute("id", cardId);
  cardImg.src = cardLink;
  cardImg.alt = cardName;
  cardTitle.textContent = cardName;

  const likes = newCard.querySelector(numberOfLikes);
  likes.textContent = likeNmbr;
  const likeBtn = newCard.querySelector(likeBtnSelector);

  if (likedByMe) {
    likeBtn.classList.add(likeBtnActiveClass);
  }

  likeBtn.addEventListener("click", toggleLikeBtn);
  const deleteBtn = newCard.querySelector(deleteBtnSelector);
  // user can delete only his own cards
  if (createdByMe) {
    deleteBtn.addEventListener("click", removeCard);
  } else {
    deleteBtn.style.display = "none";
  }

  cardImg.addEventListener("click", openPicContainer);

  return newCard;
};

const toggleLikeBtn = (evt) => {
  if (evt.srcElement.classList.contains(likeBtnActiveClass)) {
    deleteLike(
      evt.srcElement.parentNode.parentNode.parentNode.getAttribute("id")
    ).then((card) => {
      updateNumberOfLikes(card._id, card.likes.length);
      evt.srcElement.classList.toggle(likeBtnActiveClass);
    });
  } else {
    putLike(
      evt.srcElement.parentNode.parentNode.parentNode.getAttribute("id")
    ).then((card) => {
      updateNumberOfLikes(card._id, card.likes.length);
      evt.srcElement.classList.toggle(likeBtnActiveClass);
    });
  }
};

const updateNumberOfLikes = (cardId, likesCount) => {
  const likes = document.getElementById(cardId).querySelector(numberOfLikes);
  likes.textContent = likesCount;
};

const removeCard = (evt) => {
  deleteCard(evt.srcElement.parentNode.getAttribute("id")).then((res) => {
    if (res) {
      evt.srcElement.parentNode.remove();
    }
  });
};

const submitCardInfo = (evt) => {
  evt.preventDefault();
  newCardSubmitButton.textContent = "Создание...";
  postCard(cardNameInput.value, cardLinkInput.value)
    .then((res) => {
      cardsList.prepend(createCard(res.name, res.link, res._id));
    })
    .finally(() => {
      newCardSubmitButton.textContent = "Создать";
      cardNameInput.value = "";
      cardLinkInput.value = "";
      closePopup(popupAddCard);
      disableButton(evt.submitter, { buttonDisabledClass });
    });
};

const openCardPopup = () => openPopup(popupAddCard);

formAddCard.addEventListener("submit", submitCardInfo);
addCardBtn.addEventListener("click", openCardPopup);

export { addInitialCards, popupAddCard };
