export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formElement = document.querySelector(formSelector);
    this._buttonElement = this._formElement.querySelector(this._config.buttonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputInvalidClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  };

  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._config.inputInvalidClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  };

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);

    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(
        inputElement,
        errorElement,
        inputElement.validationMessage,
        this._config
      );
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _disableButton() {
    this._buttonElement.classList.add(this._config.buttonDisabledClass);
    this._buttonElement.disabled = true;
  };

  _enableButton() {
    this._buttonElement.classList.remove(this._config.buttonDisabledClass);
    this._buttonElement.disabled = false;
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // validate input
        this._checkInputValidity(inputElement);
        // check button state
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  };

  enableValidation() {

    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._disableButton();
    });

    this._setEventListeners(this._formElement);
  };
}
