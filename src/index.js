import './pages/index.css';

import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
import Api from './components/Api.js';
import PopupWithConfirm from './components/PopupWithConfirm.js';


const showPopupProfileButton = document.querySelector('.profile__edit-button');
const showPopupPicButton = document.querySelector('.profile__add-button');
const elementsContainerSelector = '.elements';
const cardSection = document.querySelector(elementsContainerSelector);
const imagePopupSelector = '.image-popup';
const profilePopup = document.querySelector('.profile-popup');
const nameInput = profilePopup.querySelector('.form__field_data_name');
const occupationInput = profilePopup.querySelector('.form__field_data_occupation');
const submitButtons = Array.from(document.querySelectorAll('.form__save-button'));

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  occupationSelector: '.profile__occupation',
  avatarSelector: '.profile__avatar'
});

const profileFormElement = document.forms.profile;
const profileFormValidator = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_invalid',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
}, profileFormElement);

profileFormValidator.enableValidation();

const cardFormElement = document.forms.card;
const cardFormValidator = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_invalid',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
}, cardFormElement);
      
cardFormValidator.enableValidation();

const avatarFormElement = document.forms.avatar;
const avatarFormValidator = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_invalid',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_visible'
}, avatarFormElement);
      
avatarFormValidator.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '1ad7ccec-ea6a-44a0-b5d9-0e1200b1fa62',
    "Content-type": "application/json"
  }
});

const profile = api.getProfileInfo();
profile.then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data);
})
.catch((err) => console.log(err));

const createCard = (item) => {
  const card = new Card(item, '.template', {
    handleCardClick: () => {
      imagePopup.open(item);
    },
    setLike: () => {
      api.setLike(item)
      .then((data) => {
        card.countLikes(data);
      })
      .catch((err) => console.log(err));
    },
    removeLike: () => {
      api.removeLike(item)
      .then((data) => {
        card.countLikes(data)
      })
      .catch((err) => console.log(err));
    },
    handleDeleteCard: (data) => {
      const popupConfirmDelete = new PopupWithConfirm({
        popupSelector: '.popup-delete',
        handleSubmit: (id) => {
          api.deleteCard(id)
          .then(() => {
            document.getElementById(data).remove();
          })
          .catch((err) => console.log(err));
        }
      });
      popupConfirmDelete.open();
      popupConfirmDelete.setEventListeners(data);
    }
  })
  return card;
}

const cards = api.getInitialCards();
cards.then((data) => {
  const cardList = new Section({
    items: data,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      card.checkOwner(item);
      card.countLikes(item);
      cardList.addItem(cardElement);
    }
  }, elementsContainerSelector);
  cardList.renderItems();
})
.catch((err) => console.log(err));

const cardPopupWithForm = new PopupWithForm({
  popupSelector: '.card-popup',
  handleFormSubmit: (formData) => {
    renderLoading(true)
    api.addCard(formData)
    .then((data) => {
    const card = createCard(data);
    const cardElement = card.generateCard();
    cardSection.prepend(cardElement);
    cardPopupWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false);
  })
  }
});

cardPopupWithForm.setEventListeners();

const avatarPopupWithForm = new PopupWithForm({
    popupSelector: '.avatar-popup',
    handleFormSubmit: (formData) => {
      renderLoading(true)
      api.setProfileAvatar(formData)
      .then((data) => {
        userInfo.setUserAvatar(data);
        avatarPopupWithForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false);
    })
    }
  });
  avatarPopupWithForm.setEventListeners();

const profilePopupWithForm = new PopupWithForm({
    popupSelector: '.profile-popup',
    handleFormSubmit: (formData) => {
      renderLoading(true)
      api.setProfileInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopupWithForm.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(false);
      })
      }
  });
  profilePopupWithForm.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();
  
const avatarButton = document.querySelector('.profile__edit-cover');
  avatarButton.addEventListener('click', () => {
    cardFormValidator.disableSubmitButton();
    avatarPopupWithForm.open();
  });
  
showPopupProfileButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  occupationInput.value = userData.occupation;
  profilePopupWithForm.open();
});

showPopupPicButton.addEventListener('click', () => {
  cardFormValidator.disableSubmitButton();
  cardPopupWithForm.open();
});

function renderLoading(isLoading) {
  if (isLoading) {
      submitButtons.forEach((item) => {
        item.textContent = "Сохранение...";
      }) 
  } else {
    submitButtons.forEach((item) => {
      if(item.classList.contains('form__save-button_place_card-popup')){
        item.textContent = "Создать";
      } else {
        item.textContent = "Сохранить";
      }
    }) 
  }
}





