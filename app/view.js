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

  bindBlur(handler) {
    $on(this.el, 'blur', handler);
  }

  bindInputChange(handler) {
    $on(this.el, 'input', event => handler(event.target.value));
  }

  onKeyDown(event, arrowUpCallback, arrowDownCallback) {
    if (event.keyCode === 38) {
      event.preventDefault();
      arrowUpCallback();
      return;
    }

    if (event.keyCode === 40) {
      event.preventDefault();
      arrowDownCallback();
      return;
    }
  }

  bindKeyDown(arrowUpCallback, arrowDownCallback) {
    $on(this.el, 'keydown', (event) => {
      this.onKeyDown(event, arrowUpCallback, arrowDownCallback);
    });
  }
}

export class SuggestionView {
  constructor() {
    this.el = qs('.suggestions');
  }

  update(suggestions) {
    this.el.innerHTML = '';
    const newSuggestionsHTML = getSuggestionsTemplate(suggestions);
    this.el.innerHTML = newSuggestionsHTML;
    if (newSuggestionsHTML) {
      this.el.classList.add('show');
    } else {
      this.el.classList.remove('show');
    }
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

  onMouseOverOut(event, handler) {
    const suggestionElement = event.target.closest('.suggestion');
    if (suggestionElement) {
      handler(suggestionElement.textContent);
    }
  }

  bindMouse(event, handler) {
    $on(this.el, event, (event) => {
      this.onMouseOverOut(event, handler);
    });
  }
}
