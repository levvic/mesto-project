import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.pic-container__image');
    this._caption = this._popup.querySelector('.pic-container__caption');
  }

  openPopup(text, link) {

    this._image.src = link;
    this._image.alt = text;
    this._caption.textContent = text;

    super.openPopup();
  }
}
