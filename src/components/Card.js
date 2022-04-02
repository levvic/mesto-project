import {
  likeBtnSelector,
  deleteBtnSelector,
  cardImgSelector,
  likeBtnActiveClass,
  newCardNameSelector
} from "../utils/constants.js";

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
    const cardElement = this._cardTemplateElement.content.cloneNode(true).querySelector("li");
    return cardElement;
  }

  _setEventListeners() {
    this._deleteBtn = this._newCardElement.querySelector(deleteBtnSelector);
    this._likeBtn = this._newCardElement.querySelector(likeBtnSelector);
    this._img = this._newCardElement.querySelector(cardImgSelector);

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteCard(this._newCardElement, this._id)
    });

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard(this._id);
    });

    this._img.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  }

  _hideDeleteBtn() {
    // user can delete only his own cards
    if (!this._createdByMe) {
      this._deleteBtn.style.display = "none";
    }
  }

  updateLikeCounter(isCardLiked, likeNumber) {
    this._likedByMe = isCardLiked;
    this._likeNmbr = likeNumber;
    this._likeBtn.nextElementSibling.textContent = likeNumber;

    if (this._likedByMe) {
      this._likeBtn.classList.add(likeBtnActiveClass);
    } else {
      this._likeBtn.classList.remove(likeBtnActiveClass);
    }
  }

  isCardLikedByMe(){
    return this._likedByMe;
  }

  createCardElement() {
    this._newCardElement = this._getTemplate();
    this._newCardElement.id = this._id;

    this._setEventListeners();
    this._hideDeleteBtn(this._newCardElement);
    this.updateLikeCounter(this._likedByMe, this._likeNmbr);

    this._img = this._newCardElement.querySelector(cardImgSelector);
    const titleElement = this._newCardElement.querySelector(newCardNameSelector);

    this._img.src = this._link;
    this._img.alt = this._name;
    titleElement.textContent = this._name;

    return this._newCardElement;
  };
}
