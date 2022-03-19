import { openPicContainer, closePopup, openPopup } from "./Modal.js";
import { disableButton } from "./FormValidator.js";
import { postCard, deleteCard, putLike, deleteLike } from "./Api.js";
import {
  cardTemplate,
  popupAddCard,
  addCardBtn,
  cardsList,
  cardNameInput,
  cardLinkInput,
  newCardSubmitButton,
  formAddCard,
  buttonDisabledClass,
  likeBtnActiveClass,
  newCardSelector,
  newCardImgSelector,
  newCardNameSelector,
  likeBtnSelector,
  deleteBtnSelector,
  numberOfLikes,
} from "../utils/constants.js";

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
  const card = evt.srcElement.closest(".location-card");
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
