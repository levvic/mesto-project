const token = "bc5524e6-2f6e-4891-adc9-e477685018b2";
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const patchProfileInfo = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const patchAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      return res.ok;
    })
    .catch((res) => showError(res));
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

const showError = (result) => {
  alert(`${result.status} ${result.statusText}`);
};
