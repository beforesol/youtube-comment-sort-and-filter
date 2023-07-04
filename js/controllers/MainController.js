import ContainerView from "../views/ButtonView.js";

class MainController {
  constructor() {
    this.containerView = new ContainerView(document.querySelector('#popup'))
  }
}

export default MainController;