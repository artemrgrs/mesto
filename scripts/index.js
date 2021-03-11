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

let popup = document.querySelector('.popup');
let showPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close');

let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__field_data_name');
let jobInput = document.querySelector('.form__field_data_occupation');

let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

let popupCard = document.querySelector('.popup_function_add-pic');
let showPopupPicButton = document.querySelector('.profile__add-button');
let closePopupPicButton = document.querySelector('.popup__close_place_add-pic');

const cardTemplate = document.querySelector('.template');
const elementsContainer = document.querySelector('.elements');
const addCard = document.querySelector('.element');
const formCard = document.querySelector('.form_data_pics');

const popupImage = document.querySelector('.popup__image');
const imagePopup = document.querySelector('.popup_function_image');
const imagePopupCloseButton = document.querySelector('.popup__close_place_show-pic');

function togglePopup() {
    popup.classList.toggle('popup_is-opened');

    if (popup.classList.contains('popup_is-opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileOccupation.textContent;
    } 
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    togglePopup();
}

function togglePopupPic() {
  popupCard.classList.toggle('popup_is-opened');
}

function createTaskDomNode (item) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardName = newCard.querySelector('.element__heading');
  cardName.textContent = item.name;
  const cardLink = newCard.querySelector('.element__image');
  cardLink.src = item.link;
  return newCard;
}

function createCards(item) {
  const card = initialCards.map(function(item) {
    const newTask = createTaskDomNode(item);
    addTaskListeners(newTask);
    return newTask;
  });
  
  elementsContainer.prepend(...card);
}

createCards();

function formCardSubmitHandler(evt) {
      evt.preventDefault();
      const inputTitle = document.querySelector('.form__field_data_title');
      const inputLink = document.querySelector('.form__field_data_link');

      const inputTitleValue = inputTitle.value;
      const inputLinkValue = inputLink.value;

      const task = createTaskDomNode({ name: inputTitleValue, link: inputLinkValue });

      addTaskListeners(task);

      elementsContainer.prepend(task);
      popupCard.classList.toggle('popup_is-opened');
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
    const imagePopup = document.querySelector('.popup__image');
    const imageCaption = document.querySelector('.popup__caption');

    imagePopupButton.addEventListener('click', toggleImagePopup);
    imagePopupButton.addEventListener('click', function(evt){
      imagePopup.src = evt.target.src;
    })
    
    imagePopupButton.addEventListener('click', function(evt){
      imageCaption.textContent = imagePopupText.textContent;
    })
}

function toggleImagePopup() {
  imagePopup.classList.toggle('popup_is-opened');
}

showPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);

showPopupPicButton.addEventListener('click', togglePopupPic);
closePopupPicButton.addEventListener('click', togglePopupPic);
  
formCard.addEventListener('submit', formCardSubmitHandler);
imagePopupCloseButton.addEventListener('click', toggleImagePopup);

  




