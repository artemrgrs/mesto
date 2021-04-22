export class Card {
    constructor( data, cardSelector, { handleCardClick }) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
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
      this._elementImage = this._element.querySelector('.element__image');
      this._setEventListeners();
      this._element.querySelector('.element__heading').textContent = this._name;
      this._elementImage.alt = this._name;
      this._elementImage.src = this._link;
        
      return this._element;
    } 

    _setEventListeners() {
      this._element.querySelector('.element__delete-button').addEventListener('click', () => {
        this._closeCard()
      });

      this._element.querySelector('.element__button').addEventListener('click', () => {
        this._likeCard();
      });

      this._elementImage.addEventListener('click', this._handleCardClick);
      
      // () => {
      //   // addImagePopup(this._name, this._link);
        
      // });
    }

    _closeCard() {
      this._element.remove();
    }
    
    _likeCard() {
      this._element.querySelector('.element__button').classList.toggle('element__button_state_active');
    }
}