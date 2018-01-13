import { $on, qs, $onOutside } from './utils/domUtils';
import { getSuggestionsTemplate } from './templates';

export class SuggestionContainerView {
  constructor() {
    this.elSelector = '.suggestion-container';
    this.el = qs('.suggestion-container');
  }

  bindOutSideClick(scope, callback) {
    $onOutside(scope, 'click', this.elSelector, callback);
  }
}

export class QueryInputView {
  constructor() {
    this.elSelector = '.query-input';
    this.el = qs(this.elSelector);
  }

  getValue() {
    return this.el.value;
  }

  setValue(string, focus = true) {
    this.el.value = string;
    if (focus) {
      this.el.focus();
    }
  }

  bindInputChange(handler) {
    $on(this.el, 'input', event => handler(event.target.value));
  }

  onKeyDown(event, keyCallbacks) {
    for (const { keyCode, callback } of keyCallbacks) {
      if (event.keyCode === keyCode) {
        event.preventDefault();
        callback();
        return;
      }
    }
  }

  bindKeyDown(keyCallbacks) {
    $on(this.el, 'keydown', (event) => {
      this.onKeyDown(event, keyCallbacks);
    });
  }
}

export class SuggestionView {
  constructor() {
    this.elSelector = '.suggestions';
    this.el = qs(this.elSelector);
  }
  update(suggestions, diffs) {
    this.el.innerHTML = '';
    const newSuggestionsHTML = getSuggestionsTemplate(suggestions, diffs);
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

  /**
 * @typedef {object} MouseEvent
 */

  /**
   * Call the handler if we move the mouse from one suggestion to another or
   * out/into the suggestions
   * @param  {MouseEvent} event
   * @param  {Function} handler
   */
  onMouseOverOut(event, handler) {
    if (
      ((!event.relatedTarget || !event.relatedTarget.closest('.suggestion')) &&
        event.target.closest('.suggestion')) ||
      (event.target.closest('.suggestion') &&
        event.relatedTarget.closest('.suggestion') &&
        event.relatedTarget.closest('.suggestion') !== event.target.closest('.suggestion'))
    ) {
      handler(event.target.closest('.suggestion').textContent);
    }
  }

  onClick(event, handler) {
    if (event.target.closest('.suggestion')) {
      handler();
    }
  }

  bindClick(handler) {
    $on(this.el, 'click', (event) => {
      this.onClick(event, handler);
    });
  }

  bindMouse(type, handler) {
    $on(this.el, type, (event) => {
      this.onMouseOverOut(event, handler);
    });
  }
}
