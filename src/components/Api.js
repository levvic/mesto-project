export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;

    /*this._config = {
      baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
      headers: {
        authorization: "bc5524e6-2f6e-4891-adc9-e477685018b2",
        "Content-Type": "application/json",
      }
    };*/
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      .then(this._checkResponse);
  };

  patchProfileInfo(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: description,
        }),
      })
      .then(this._checkResponse);
  };

  patchAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      })
      .then(this._checkResponse);
  };

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      .then(this._checkResponse);
  };

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then(this._checkResponse);
  };

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse);
  };

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(this._checkResponse);
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(this._checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  };
}
