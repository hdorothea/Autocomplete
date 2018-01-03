import { $on, qs } from './utils/domUtils';
import { getSuggestionsTemplate } from './templates';

export class QueryInputView {
  constructor() {
    this.el = qs('.query-input');
  }

  getValue() {
    return this.el.value;
  }

  setValue(string) {
    this.el.value = string;
  }

  bindInputChange(handler) {
    $on(this.el, 'input', event => handler(event.target.value));
  }
}

export class SuggestionView {
  constructor() {
    this.el = qs('.suggestions');
  }

  update(suggestions) {
    this.el.innerHTML = '';
    this.el.innerHTML = getSuggestionsTemplate(suggestions);
  }
}
