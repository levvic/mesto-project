document.addEventListener('DOMContentLoaded', function(event) {

  const popUp = document.querySelector('.popup');
  const editBtn = document.querySelector('.profile__edit-btn');
  const closeBtn = document.querySelector('.popup__close-btn');
  const cardsList = document.querySelector('.location-cards');

  // photos
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

  const addInitialCards = () => {

    initialCards.forEach(card => {
      cardsList.insertAdjacentHTML('beforeend',
      `<li class="location-card">
        <img src="${card.link}" alt="${card.name}" class="location-card__image">
        <div class="location-card__description">
          <h2 class="location-card__name">
            ${card.name}
          </h2>
          <button type="button" class="location-card__like-btn" aria-label="Мне нравится"></button>
        </div>
      </li>`);

    });
  }

  addInitialCards();

  function openPopup() {
    popUp.classList.add('popup_opened');
    popUp.querySelector('input[name="name"]').value = document.querySelector('.profile__name').textContent;
    popUp.querySelector('input[name="description"]').value = document.querySelector('.profile__description').textContent;
  }

  function closePopup() {
    popUp.classList.remove('popup_opened');
  }

  const updateProfileInfoOnPage = () => {
    document.querySelector('.profile__name').textContent = popUp.querySelector('input[name="name"]').value;
    document.querySelector('.profile__description').textContent = popUp.querySelector('input[name="description"]').value;
  }

  function formSubmitHandler (evt) {
    evt.preventDefault();
    updateProfileInfoOnPage();
    closePopup();
  }

  editBtn.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  popUp.addEventListener('submit', formSubmitHandler);


});


