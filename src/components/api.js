const token = "bc5524e6-2f6e-4891-adc9-e477685018b2";
const cohort = "plus-cohort7";

export const getUserInfo = () => {
  return fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const patchProfileInfo = (name, description) => {
  return fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
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

export const getCards = () => {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((res) => showError(res));
};

export const postCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then((res) => {
    if (res.ok) return res.json();
  })
  .catch((res) => showError(res));
}

const showError = (result) => {
  alert(`${result.status} ${result.statusText}`);
};
