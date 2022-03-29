import {
  likeBtnSelector,
  deleteBtnSelector,
  numberOfLikesSelector,
  cardImgSelector,
  likeBtnActiveClass,
  newCardNameSelector
} from "./utils/constants.js";

export default class Card {
  constructor({
    id,
    name,
    link,
    likeNmbr,
    likedByMe,
    createdByMe,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard
  }, templateSelector) {
    this._id = id;
    this._name = name;
    this._link = link;
    this._likeNmbr = likeNmbr;
    this._likedByMe = likedByMe;
    this._createdByMe = createdByMe;

    this._cardTemplateElement = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardElement = this._cardTemplateElement.content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners(element) {
    const deleteBtn = element.querySelector(deleteBtnSelector);
    this._likeBtn = element.querySelector(likeBtnSelector);
    const img = element.querySelector(cardImgSelector);

    deleteBtn.addEventListener('click', () => {
      this._handleDeleteCard(element, this._id)
    });

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard(this._id);
    });

    img.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });

    //this._deleteBtn = element.querySelector(deleteBtnSelector);
    //this._
  }

  _hideDeleteBtn(newCard) {
    const deleteBtn = newCard.querySelector(deleteBtnSelector);
    // user can delete only his own cards
    if (!this._createdByMe) {
      deleteBtn.style.display = "none";
    }
  }

  updateLikeCounter(isCardLiked, likeNumber) {
    this._likedByMe = isCardLiked;
    this._likeNmbr = likeNumber;

    const likeNmbrElement = this._newCardElement.querySelector(numberOfLikesSelector);
    likeNmbrElement.textContent = likeNumber;

    if (this._likedByMe) {
      this._likeBtn.classList.add(likeBtnActiveClass);
    } else {
      this._likeBtn.classList.remove(likeBtnActiveClass);
    }
  }

  createCard() {
    this._newCardElement = this._getTemplate();
    this._setEventListeners(this._newCardElement);
    this._hideDeleteBtn(this._newCardElement);
    this.updateLikeCounter(this._likedByMe, this._likeNmbr);

    const imgElement = this._newCardElement.querySelector(cardImgSelector);
    const titleElement = this._newCardElement.querySelector(newCardNameSelector);

    this._newCardElement.setAttribute("id", this._id);
    imgElement.src = this._link;
    imgElement.alt = this._name;
    titleElement.textContent = this._name;

    return this._newCardElement;
  };
}
