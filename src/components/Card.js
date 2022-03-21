import FormValidator from "./FormValidator.js";
import Api from "./Api.js";
import Modal from "./Modal.js";

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

export default class Card {
  constructor() {
    this._api = new Api();
    this._modal = new Modal();
    this._validator = new FormValidator({
      buttonDisabledClass
    });
  }

  createCard(
    cardName,
    cardLink,
    cardId,
    likedByMe = false,
    likeNmbr = 0,
    createdByMe = true
  ) {
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
        this._api.deleteLike(cardId)
          .then((card) => {
            this.updateNumberOfLikes(card._id, card.likes.length);
            likeBtn.classList.toggle(likeBtnActiveClass);
          })
          .catch((err) => {
            alert("Ошибка");
            console.log(err);
          });
      } else {
        this._api.putLike(cardId)
          .then((card) => {
            this.updateNumberOfLikes(card._id, card.likes.length);
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
      deleteBtn.addEventListener("click", this.removeCard);
    } else {
      deleteBtn.style.display = "none";
    }

    cardImg.addEventListener("click", this._modal.openPicContainer);
    return newCard;
  };

  updateNumberOfLikes(cardId, likesCount) {
    const likes = document.getElementById(cardId).querySelector(numberOfLikes);
    likes.textContent = likesCount;
  };

  removeCard(evt) {
    const card = evt.srcElement.closest(".location-card");
    this._api.deleteCard(card.id)
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

  submitCardInfo(evt) {
    evt.preventDefault();
    newCardSubmitButton.textContent = "Создание...";
    this._api.postCard(cardNameInput.value, cardLinkInput.value)
      .then((res) => {
        cardsList.prepend(createCard(res.name, res.link, res._id));
        cardNameInput.value = "";
        cardLinkInput.value = "";
        this._modal.closePopup(popupAddCard);
        this._validator.disableButton(evt.submitter);
      })
      .catch((err) => {
        alert("Ошибка");
        console.log(err);
      })
      .finally(() => {
        newCardSubmitButton.textContent = "Создать";
      });
  };

  openCardPopup() {
    this._modal.openPopup(popupAddCard)
  };

  //  formAddCard.addEventListener("submit", submitCardInfo);
  //  addCardBtn.addEventListener("click", openCardPopup);

}
