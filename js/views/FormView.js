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
  }

  onApply() {
    
  }
}

export default FormView;
