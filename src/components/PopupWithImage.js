import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(evt) {

    this._popup.querySelector('.pic-container__image').src = evt.target.src;
    this._popup.querySelector('.pic-container__caption').textContent = evt.target.alt;
    this._popup.querySelector('.pic-container__image').alt = evt.target.alt;

    super.openPopup();
  }
}
