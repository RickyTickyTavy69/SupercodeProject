export default class Userdto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
