import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.form');
    }
    
    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.form__field');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });
        return this._formValues;
    }
    
    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
      } 

    close() {
        this._form.reset();
        super.close();
    }
}
