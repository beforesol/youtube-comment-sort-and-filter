import View from './View.js';

class ContainerView extends View {
  constructor(el) {
    super(el);
    this.closeBtnEl = el.querySelector('[data-button-type="close"]');

    this.bindEvents();
    return this;
  }

  bindEvents() {
    this.closeBtnEl.addEventListener('click', this.onClose);
  }

  onClose() {
    chrome.extension.getViews({ type: 'popup' }).forEach(function(view) {
      view.close();
    });
  }
}

export default ContainerView;
