import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleSubmit }) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._confirmButton = this._popupElement.querySelector('.popup__confirm-button');
    }
    
    setEventListeners(data) {
      this._confirmButton.addEventListener('click', () => {
          this._handleSubmit(data);
          this.close();
        });
        super.setEventListeners();
      } 
}
