export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
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
        this._setEventListeners();
        this._element.querySelector('.element__heading').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__image').src = this._link;
        
        return this._element;
      } 

    _setEventListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._closeCard()
        });

        this._element.querySelector('.element__button').addEventListener('click', () => {
            this._likeCard();
        });
      }

    _closeCard() {
        this._element.remove();
      }
    
    _likeCard() {
        this._element.querySelector('.element__button').classList.toggle('element__button_state_active');
    }
}