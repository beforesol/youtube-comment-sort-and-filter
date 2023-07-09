import PopupView from "../views/PopupView.js";
import CommentModel from '../models/CommentModel.js';
import LoadingView from "../views/LoadingView.js";

class MainController {
  constructor() {
    // View
    this.popupView = new PopupView(document.querySelector('[data-component="container"]'))
    this.loadingView = new LoadingView(document.querySelector('[data-component="loading"]'))

    // Model
    CommentModel.fetchComment('W0ap3thVqbo').then(() => {
      this.loadingView.hide()
      this.popupView.show()
    })

    // Event
    this.popupView.on('@clear', () => {
      CommentModel.clear();
      this.render()
    })

    this.popupView.on('@apply', e => {
      CommentModel.filter(e.detail);
      this.render()
    })
  }

  render() {

  }
}

export default MainController;