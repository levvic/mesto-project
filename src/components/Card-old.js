import FormValidator from "./FormValidator.js";

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
  constructor({
    putLike,
    deleteLike,
    postCard,
    deleteCard,
    openPopup,
    closePopup,
    openPicContainer
  }) {
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._postCard = postCard;
    this._deleteCard = deleteCard;

    /*this._openPopup = openPopup;
    this._closePopup = closePopup;
    this._openPicContainer = openPicContainer;*/

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
        this._deleteLike()
          .then((card) => {
            this.updateNumberOfLikes(card._id, card.likes.length);
            likeBtn.classList.toggle(likeBtnActiveClass);
          })
          .catch((err) => {
            alert("Ошибка");
            console.log(err);
          });
      } else {
        this._putLike()
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

    //cardImg.addEventListener("click", this._openPicContainer);
    return newCard;
  };

  updateNumberOfLikes(cardId, likesCount) {
    const likes = document.getElementById(cardId).querySelector(numberOfLikes);
    likes.textContent = likesCount;
  };

  removeCard(evt) {
    const card = evt.srcElement.closest(".location-card");
    this._deleteCard()
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

  /*submitCardInfo(evt) {
    evt.preventDefault();
    newCardSubmitButton.textContent = "Создание...";
    this._postCard()
      .then((res) => {
        cardsList.prepend(createCard(res.name, res.link, res._id));
        cardNameInput.value = "";
        cardLinkInput.value = "";
        this._closePopup();
        this._validator.disableButton(evt.submitter);
      })
      .catch((err) => {
        alert("Ошибка");
        console.log(err);
      })
      .finally(() => {
        newCardSubmitButton.textContent = "Создать";
      });
  }; */

  /*openCardPopup() {
    this._openPopup()
  }; */

  //formAddCard.addEventListener("submit", submitCardInfo);
  //  addCardBtn.addEventListener("click", openCardPopup);

}