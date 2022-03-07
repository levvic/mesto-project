import { openPicContainer, closePopup, openPopup } from "./modal.js";
import { disableButton } from "./validate.js";
import {
  postCard,
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

export const createCard = (
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

  likeBtn.addEventListener("click", () => {
    if (likeBtn.classList.contains(likeBtnActiveClass)) {
      deleteLike(cardId)
        .then((card) => {
          updateNumberOfLikes(card._id, card.likes.length);
          likeBtn.classList.toggle(likeBtnActiveClass);
        })
        .catch((err) => {
          alert("Ошибка");
          console.log(err);
        });
    } else {
      putLike(cardId)
        .then((card) => {
          updateNumberOfLikes(card._id, card.likes.length);
          likeBtn.classList.toggle(likeBtnActiveClass);
        })
        .catch((err) => {
          alert("Ошибка");
          console.log(err);
        });
    }
  });

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

const updateNumberOfLikes = (cardId, likesCount) => {
  const likes = document.getElementById(cardId).querySelector(numberOfLikes);
  likes.textContent = likesCount;
};

const removeCard = (evt) => {
  const card = evt.srcElement.closest('.location-card');
  deleteCard(card.id)
  .then((res) => {
    if (res) {
      card.remove();
    }
  })
  .catch((err) => {
    alert("Ошибка");
    console.log(err);
  });
};

const submitCardInfo = (evt) => {
  evt.preventDefault();
  newCardSubmitButton.textContent = "Создание...";
  postCard(cardNameInput.value, cardLinkInput.value)
    .then((res) => {
      cardsList.prepend(createCard(res.name, res.link, res._id));
      cardNameInput.value = "";
      cardLinkInput.value = "";
      closePopup(popupAddCard);
      disableButton(evt.submitter, { buttonDisabledClass });
    })
    .catch((err) => {
      alert("Ошибка");
      console.log(err);
    })
    .finally(() => {
      newCardSubmitButton.textContent = "Создать";
    });
};

const openCardPopup = () => openPopup(popupAddCard);

formAddCard.addEventListener("submit", submitCardInfo);
addCardBtn.addEventListener("click", openCardPopup);
