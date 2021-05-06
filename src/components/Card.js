export class Card {
    constructor( data, cardSelector, { handleCardClick, setLike, removeLike, handleDeleteCard }) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._setLike = setLike;
      this._removeLike = removeLike;
      this._handleDeleteCard = handleDeleteCard;
      this._id = data._id;
    
    }

    checkOwner(data) {
      if (data.owner._id !== this._ownerId) {
        this._element.querySelector('.element__delete-button').remove();
      }
    }
    
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        
      return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.element__button');
      this._elementImage = this._element.querySelector('.element__image');
      this._setEventListeners();
      this._element.querySelector('.element__heading').textContent = this._name;
      this._elementImage.alt = this._name;
      this._elementImage.src = this._link;
      this._element.id = this._id;
      return this._element;
    } 

    _setEventListeners() {
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._handleDeleteCard(this._id)
      });

      this._likeButton.addEventListener('click', () => {
        if(this._likeButton.classList.contains('element__button_state_active')) {
          this._dislikeCard();
        } else {
          this._likeCard();
        }
      });

      this._elementImage.addEventListener('click', this._handleCardClick);
    }
    
    _likeCard(data) {
      this._likeButton.classList.add('element__button_state_active');
      this._setLike(data);
    }

    _dislikeCard(data) {
      this._likeButton.classList.remove('element__button_state_active');
      this._removeLike(data);
    }

    countLikes(data) {
      this._element.querySelector('.element__like-count').textContent = data.likes.length;
    }
}