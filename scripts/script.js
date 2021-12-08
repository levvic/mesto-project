document.addEventListener('DOMContentLoaded', function(event) {

  const popupEditProfile = document.querySelector('#popup_edit-profile');
  const popupAddCard = document.querySelector('#popup_add-card');
  const popupOpenPic = document.querySelector('#popup_pic');
  const editProfileBtn = document.querySelector('.profile__edit-btn');
  const closeProfileFormBtn = document.querySelector('#close_edit-profile');
  const closeCardFormBtn = document.querySelector('#close_add-card');
  const closePictureBtn = document.querySelector('#close_show-pic');
  const cardsList = document.querySelector('.location-cards');
  const addCardBtn = document.querySelector('.profile__add-card-btn');
  const popupImg = document.querySelector('.pic-container__image');
  const imgTitle = document.querySelector('.pic-container__caption');

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

    const openPicContainer = (evt) => {
      popupImg.src = evt.target.src;
      popupImg.alt = evt.target.alt;
      imgTitle.textContent = evt.target.alt;
      
      openPopup(popupOpenPic);
    }

  const toggleLikeBtn = (evt) => evt.srcElement.classList.toggle("location-card__like-btn_active");

  const deleteCard = (evt) => evt.srcElement.parentNode.remove();

  const addCard = (cardName, cardLink) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.querySelector('.location-card').cloneNode(true);
    const cardImg = newCard.querySelector('.location-card__image');
    const cardTitle = newCard.querySelector('.location-card__name');

    cardImg.src = cardLink;
    cardImg.alt = cardName;
    cardTitle.textContent = cardName;

    const likeBtn = newCard.querySelector('.location-card__like-btn');
    likeBtn.addEventListener('click', toggleLikeBtn);
    const deleteBtn = newCard.querySelector('.location-card__delete-btn');
    deleteBtn.addEventListener('click', deleteCard);
    cardImg.addEventListener('click', openPicContainer);

    cardsList.prepend(newCard);
  }


  const addInitialCards = () => initialCards.forEach(card => addCard(card.name, card.link));
  addInitialCards();

  const openProfilePopup = () => {
    popupEditProfile.querySelector('input[name="name"]').value = document.querySelector('.profile__name').textContent;
    popupEditProfile.querySelector('input[name="description"]').value = document.querySelector('.profile__description').textContent;

    openPopup(popupEditProfile);
  }

  const openCardPopup = () => openPopup(popupAddCard);

  const openPopup = (popup) => popup.classList.add('popup_opened');

  const closePopup = () => {
    document.querySelector('.popup_opened').classList.add('fade-out');
    setTimeout(function(){
      document.querySelector('.popup_opened').classList.remove('popup_opened', 'fade-out');
    }, 1000);
  }

  const updateProfileInfoOnPage = () => {
    document.querySelector('.profile__name').textContent = popupEditProfile.querySelector('input[name="name"]').value;
    document.querySelector('.profile__description').textContent = popupEditProfile.querySelector('input[name="description"]').value;
  }

  const submitForm = (evt) => {
    evt.preventDefault();

    if(evt.srcElement.className === 'form-name')
      updateProfileInfoOnPage();
    else if(evt.srcElement.className === 'form-card'){
      addCard(popupAddCard.querySelector('input[name="name"]').value, popupAddCard.querySelector('input[name="link"]').value);
      popupAddCard.querySelector('input[name="name"]').value = "";
      popupAddCard.querySelector('input[name="link"]').value = "";
    }

    closePopup();
  }


  editProfileBtn.addEventListener('click', openProfilePopup);
  closeProfileFormBtn.addEventListener('click', closePopup);
  closeCardFormBtn.addEventListener('click', closePopup);
  closePictureBtn.addEventListener('click', closePopup);
  addCardBtn.addEventListener('click', openCardPopup);
  popupEditProfile.addEventListener('submit', submitForm);
  popupAddCard.addEventListener('submit', submitForm);

});


