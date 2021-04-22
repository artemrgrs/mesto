export default class UserInfo {
    constructor({nameSelector, occupationSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._occupationElement = document.querySelector(occupationSelector);
    }

    getUserInfo() {
        this._user = {
            name: this._nameElement.textContent,
            occupation: this._occupationElement.textContent
        };
        return this._user;
    }

    setUserInfo(formData) {
        this._nameElement.textContent =  formData.name;
        this._occupationElement.textContent = formData.occupation;
    }
}