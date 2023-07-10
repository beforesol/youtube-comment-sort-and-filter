import View from './View.js';

class PopupView extends View {
  constructor(el) {
    super(el);

    this.closeBtnEl = this.el.querySelector('[data-button-type="close"]');
    this.clearBtnEl = this.el.querySelector('[data-button-type="clear"]');
    this.applyBtnEl = this.el.querySelector('[data-button-type="apply"]');

    this.bindEvents();
    this.hide();

    return this;
  }

  bindEvents = () => {
    this.closeBtnEl.addEventListener('click', this.onClose);
    this.clearBtnEl.addEventListener('click', this.onClear)
    this.applyBtnEl.addEventListener('click', this.onApply)
  }

  onClose = () => {
    chrome.extension.getViews({ type: 'popup' }).forEach(function (view) {
      view.close();
    });
  }

  onClear = () => {
    const form = this.el.querySelector('form');

    form.reset();
    this.emit('@clear')
  }

  onApply = () => {
    const filter = Array.from(this.el.querySelectorAll('[name="filter"]')).filter(item => item.checked).map(item => item.id);
    const sort = Array.from(this.el.querySelectorAll('[name="sort"]')).filter(item => item.checked)[0].id;
    const lang = Array.from(this.el.querySelectorAll('[name="lang"]')).filter(item => item.checked)[0].id;

    this.emit('@apply', { filter, sort, lang })
  }
}

export default PopupView;
