import View from './View.js';

class ButtonView extends View {
  constructor(el) {
    super(el);
    this.closeBtnEl = el.querySelector('[data-button-type="close"]');
    this.clearBtnEl = el.querySelector('[data-button-type="clear"]');
    this.applyBtnEl = el.querySelector('[data-button-type="apply"]');

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

export default ButtonView;
