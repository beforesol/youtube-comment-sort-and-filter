import FormView from "../views/FormView.js";
import ContainerView from '../views/ContainerView.js';
import CommentModel from '../models/CommentModel.js';
import LoadingView from "../views/LoadingView.js";

class MainController {
  constructor() {
    // View
    this.containerView = new ContainerView(document.querySelector('[data-component="container"]'))
    this.formView = new FormView(document.querySelector('[data-component="form"]'))
    this.loadingView = new LoadingView(document.querySelector('[data-component="loading"]'))

    // Model
    CommentModel.fetchComment('HO0AyUK-ASM').then(() => {
      this.loadingView.hide()
      this.formView.show()
    })

    // Event
    this.formView.on('@apply', e => {
      CommentModel.filter(e.detail);
      this.render()
    })
  }

  render() {

  }
}

export default MainController;