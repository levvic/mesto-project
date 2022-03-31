export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector
  }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {

    const user = {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent
    }

    return user;
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
  }
}
