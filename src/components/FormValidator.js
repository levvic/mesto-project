export default class FormValidator {
  constructor(config) {
    this._config = config;
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

  _checkInputValidity(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement, this._config);
    } else {
      this._showInputError(
        inputElement,
        errorElement,
        inputElement.validationMessage,
        this._config
      );
    }
  };

  _toggleButtonState(formElement, inputList) {
    const buttonElement = formElement.querySelector(this._config.buttonSelector);

    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement, this._config);
    } else {
      this._enableButton(buttonElement, this._config);
    }
  };

  _hasInvalidInput(inputList) {
    inputList.some((inputElement) => !inputElement.validity.valid);
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this._config.buttonDisabledClass);
    buttonElement.disabled = true;
  };

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._config.buttonDisabledClass);
    buttonElement.disabled = false;
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._config.inputSelector)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // validate input
        this._checkInputValidity(formElement, inputElement, this._config);
        // check button state
        this._toggleButtonState(formElement, inputList, this._config);
      });
    });

    this._toggleButtonState(formElement, inputList, this._config);
  };

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._config.formSelector));

    forms.forEach((formElement) => {
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      });

      this._setEventListeners(formElement, this._config);
    });
  }
}
