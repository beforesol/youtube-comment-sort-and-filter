import View from './View.js';

class FormView extends View {
  constructor(el) {
    super(el);
    this.data = [];

    this.clearBtnEl = el.querySelector('[data-button-type="clear"]');
    this.applyBtnEl = el.querySelector('[data-button-type="apply"]');

    this.bindEvents();
    this.hide();

    return this;
  }

  bindEvents() {
    this.applyBtnEl.addEventListener('click', this.onApply.bind(this))
  }

  onApply() {
    const filter = Array.from(this.el.querySelectorAll('[name="filter"]')).filter(item => item.checked).map(item => item.id);
    const sort = Array.from(this.el.querySelectorAll('[name="sort"]')).filter(item => item.checked)[0].id;
    const lang = Array.from(this.el.querySelectorAll('[name="lang"]')).filter(item => item.checked)[0].id;

    this.emit('@apply', { filter, sort, lang })
  }
}

export default FormView;
