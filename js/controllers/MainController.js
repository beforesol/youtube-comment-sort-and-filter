import PopupView from "../views/PopupView.js";
import CommentModel from '../models/CommentModel.js';
import LoadingView from "../views/LoadingView.js";
import CommentView from '../views/CommentView.js';

class MainController {
  constructor() {
    // View
    this.loadingView = new LoadingView(document.querySelector('[data-component="loading"]'))
    this.popupView = new PopupView(document.querySelector('[data-component="popup"]'))
    this.commentView = new CommentView(document.querySelector('[data-component="comment"]'))

    // Model
    CommentModel.fetchComment('W0ap3thVqbo').then(() => {
      this.loadingView.hide()
      this.popupView.show()
    })

    // Event
    this.popupView.on('@clear', () => {
      CommentModel.clear();
    })

    this.popupView.on('@apply', e => {
      CommentModel.filter(e.detail);
      this.commentView.render(CommentModel.data);
    })
  }
}

export default MainController;