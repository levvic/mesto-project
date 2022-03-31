export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    avatarSelector
  }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._profilePictureElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {

    const user = {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent
    }

    return user;
  }

  setUserInfo(name, about, avatarLink) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    this._profilePictureElement.style = `background-image: url(${avatarLink})`;
  }
}
