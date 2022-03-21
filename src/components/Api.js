export default class Api {
  constructor() {
    this._token = "bc5524e6-2f6e-4891-adc9-e477685018b2";
    this._config = {
      baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      }
    };
  }

  getUserInfo() {
    return fetch(`${this._config.baseUrl}/users/me`, {
        headers: this._config.headers,
      })
      .then(_checkResponse);
  };

  patchProfileInfo(name, description) {
    return fetch(`${this._config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          name: name,
          about: description,
        }),
      })
      .then(_checkResponse);
  };

  patchAvatar(link) {
    return fetch(`${this._config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._config.headers,
        body: JSON.stringify({
          avatar: link,
        }),
      })
      .then(_checkResponse);
  };

  getCards() {
    return fetch(`${this._config.baseUrl}/cards`, {
        headers: this._config.headers,
      })
      .then(_checkResponse);
  };

  postCard(name, link) {
    return fetch(`${this._config.baseUrl}/cards`, {
        method: "POST",
        headers: this._config.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then(_checkResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._config.headers,
      })
      .then(_checkResponse);
  };

  putLike(cardId) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._config.headers,
      })
      .then(_checkResponse);
  };

  deleteLike(cardId) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._config.headers,
      })
      .then(_checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  };
}
