export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({
    userName,
    userDescription
  }, getUserInformation, patchProfileInfo) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._getUserInformation = getUserInformation;
    this._patchProfileInfo = patchProfileInfo;
  }
  //публичный метод getUserInfo, который возвращает объект с данными пользователя.
  getUserInfo() {

    this._getUserInformation()
      .then(userData => userdata)
      .catch((err) => {
        alert("Ошибка");
        console.log(err);
      });

    /*return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    }*/
  }
  //Содержит публичный метод setUserInfo, 
  //который принимает новые данные пользователя

  
  setUserInfo() {
    // отправляет их на сервер 
    this._patchProfileInfo(this._userName, this._userDescription);

    //render on client


    /*this._userName.textContent = item.name;
    this._userDescription.textContent = item.about;    */

  }
}
