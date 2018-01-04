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

  updateSuggestion(suggestion, updateFunc) {
    this.el.querySelectorAll('.suggestion').forEach((suggestionLi) => {
      if (suggestion !== null && suggestionLi.textContent === suggestion) {
        updateFunc(suggestionLi);
      }
    });
  }

  switchActive(previouslyActiveSuggestion, newlyActiveSuggestion) {
    if (previouslyActiveSuggestion) {
      this.unmarkActive(previouslyActiveSuggestion);
    }
    if (newlyActiveSuggestion) {
      this.markActive(newlyActiveSuggestion);
    }
  }

  unmarkActive(previouslyActiveSuggestion) {
    this.updateSuggestion(previouslyActiveSuggestion, suggestionE => suggestionE.classList.remove('active'));
  }

  markActive(newlyActiveSuggestion) {
    this.updateSuggestion(newlyActiveSuggestion, suggestionE => suggestionE.classList.add('active'));
  }

  onMouseOverOut(event, handler) {
    if (event.target.classList.contains('suggestion')) {
      handler(event.target.textContent);
    }
  }

  bindMouse(event, handler) {
    $on(this.el, event, (event) => {
      this.onMouseOverOut(event, handler);
    });
  }
}
