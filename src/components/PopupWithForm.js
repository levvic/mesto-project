import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = this._popupForm.querySelectorAll('.form__input');
    this._nameInput = this._popupForm.querySelector('#profileName');
    this._aboutInput = this._popupForm.querySelector('#profileDescription');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      if (data.hasOwnProperty(input.name)){
        input.value = data[input.name]
      }
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
