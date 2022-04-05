import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this._popup.querySelector('.pic-container__image');
    this.caption = this._popup.querySelector('.pic-container__caption');
  }

  openPopup(text, link) {

    this.image.src = link;
    this.image.alt = text;
    this.caption.textContent = text;

    super.openPopup();
  }
}
