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

const profilePopup = document.querySelector('.profile-popup');
const showPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = profilePopup.querySelector('.popup__close');

const formElement = profilePopup.querySelector('.form');
const nameInput = profilePopup.querySelector('.form__field_data_name');
const jobInput = profilePopup.querySelector('.form__field_data_occupation');
const inputTitle = document.querySelector('.form__field_data_title');
const inputLink = document.querySelector('.form__field_data_link');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const showPopupPicButton = document.querySelector('.profile__add-button');

const popupCard = document.querySelector('.card-popup');
const closePopupPicButton = popupCard.querySelector('.popup__close');
const formCard = popupCard.querySelector('.form');

const cardTemplate = document.querySelector('.template');
const elementsContainer = document.querySelector('.elements');
const addCard = document.querySelector('.element');

const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const imageCaption = document.querySelector('.popup__caption');

function togglePopup(popup) {
  popup.classList.toggle('popup_is-opened');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      togglePopup(popup);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (popup.classList.contains('popup_is-opened')) {
      if (evt.key === 'Escape') {
        togglePopup(popup);
     }
    }
  });
}

function toggleProfilePopup() {
  togglePopup(profilePopup);
  formElement.reset();

    if (profilePopup.classList.contains('popup_is-opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileOccupation.textContent;
    } 
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    toggleProfilePopup();
}

function togglePopupPic() {
  togglePopup(popupCard);
  formCard.reset();
}

function createTaskDomNode (item) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardName = newCard.querySelector('.element__heading');
  cardName.textContent = item.name;
  const cardLink = newCard.querySelector('.element__image');
  cardLink.src = item.link;
  cardLink.alt = item.name;
  return newCard;
}

function createCards(item) {
  const cards = initialCards.map(function(item) {
    const newTask = createTaskDomNode(item);
    addTaskListeners(newTask);
    return newTask;
  });
  
  elementsContainer.prepend(...cards);
}

createCards();

function formCardSubmitHandler(evt) {
      evt.preventDefault();
      
      const inputTitleValue = inputTitle.value;
      const inputLinkValue = inputLink.value;

      const task = createTaskDomNode({ name: inputTitleValue, link: inputLinkValue });

      addTaskListeners(task);

      elementsContainer.prepend(task);
      togglePopup(popupCard);
}

function addTaskListeners(element) {
    const likeButton = element.querySelector('.element__button');
    likeButton.addEventListener('click', function(){
        likeButton.classList.toggle('element__button_state_active');
      })

    const deleteButton = element.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', function(evt){
      evt.target.closest('.element').remove();
    })

    const imagePopupButton = element.querySelector('.element__image');
    const imagePopupText = element.querySelector('.element__heading');
 
    function addImagePopup (evt){
      popupImage.src = evt.target.src;
      popupImage.alt = imagePopupText.textContent;
      imageCaption.textContent = imagePopupText.textContent;
      toggleImagePopup();
    }
    
    imagePopupButton.addEventListener('click', addImagePopup);
}

function toggleImagePopup() {
  togglePopup(imagePopup);
}


showPopupButton.addEventListener('click', toggleProfilePopup);
closePopupButton.addEventListener('click', toggleProfilePopup);

formElement.addEventListener('submit', formSubmitHandler);

showPopupPicButton.addEventListener('click', togglePopupPic);
closePopupPicButton.addEventListener('click', togglePopupPic);
  
formCard.addEventListener('submit', formCardSubmitHandler);
imagePopupCloseButton.addEventListener('click', toggleImagePopup);
