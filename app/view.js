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

  updateActive(activeSuggestion) {
    this.el.querySelectorAll('.suggestion').forEach((suggestionLi) => {
      if (suggestionLi.textContent === activeSuggestion) {
        suggestionLi.classList.add('active');
      } else {
        suggestionLi.classList.remove('active');
      }
    });
  }

  onMouseOver(event, handler) {
    const suggestionElement = event.target.closest('.suggestion');
    if (suggestionElement) {
      handler(suggestionElement.textContent);
    }
  }

  bindMouseOver(handler) {
    $on(this.el, 'mouseover', (event) => {
      this.onMouseOver(event, handler);
    });
  }
}
