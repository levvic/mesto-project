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
    }, templateSelector,
    likeBtnSelector,
    deleteBtnSelector,
    cardImgSelector,
    likeBtnActiveClass,
    newCardNameSelector,
    cardSelector) {
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

    this._likeBtnSelector = likeBtnSelector,
    this._deleteBtnSelector = deleteBtnSelector,
    this._cardImgSelector = cardImgSelector,
    this._likeBtnActiveClass = likeBtnActiveClass,
    this._newCardNameSelector = newCardNameSelector,
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = this._cardTemplateElement.content.querySelector(this._cardSelector).cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._deleteBtn = this._newCardElement.querySelector(this._deleteBtnSelector);
    this._likeBtn = this._newCardElement.querySelector(this._likeBtnSelector);

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
      this._likeBtn.classList.add(this._likeBtnActiveClass);
    } else {
      this._likeBtn.classList.remove(this._likeBtnActiveClass);
    }
  }

  isCardLikedByMe() {
    return this._likedByMe;
  }

  createCardElement() {
    this._newCardElement = this._getTemplate();
    this._newCardElement.id = this._id;
    this._img = this._newCardElement.querySelector(this._cardImgSelector);
    this.titleElement = this._newCardElement.querySelector(this._newCardNameSelector);

    this._img.src = this._link;
    this._img.alt = this._name;
    this.titleElement.textContent = this._name;

    this._setEventListeners();
    this._hideDeleteBtn();
    this.updateLikeCounter(this._likedByMe, this._likeNmbr);

    return this._newCardElement;
  };
}
