export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {

    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close-btn")
      ) {
        this.closePopup();
      }
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const activePopup = document.querySelector(".popup_opened");

      if (activePopup)
        this.closePopup();
    }
  }

}
