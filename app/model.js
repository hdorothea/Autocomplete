import { getLastWordAutoCompleteSuggestionsFakeBackend, getNextIndexCircular } from './utils/utils';

export default class Model {
  setQuery(query) {
    this.query = query;
  }
  /**
   * Fetch the suggestions for the last word from the backend. Update suggestions
   * and related properties to reflect the new suggestions
   * @param  {Function} callback Called with the new suggestions and difference slices
   * when the suggestions and difference slices have been updated
   */
    this.suggestions = suggestions;
  }

  async updateSuggestions() {
    const suggestions = await getLastWordAutoCompleteSuggestionsFakeBackend(this.query, true);
    this.setSuggestions(suggestions);
  }
  /**
   * Update query and suggestions to reflect the new query
   * @param  {!string} newQuery
   * @param  {Function} callback Called with the new suggestions and difference slices
   * when the query and suggestions have been completed
   */
  async updateQuery(newQuery, callback) {
    this.setQuery(newQuery);
    await this.updateSuggestions();
    this.setActiveSuggestionI(null);
    if (callback) {
      callback(this.suggestions);
    }
  }

  setActiveSuggestionI(activeSuggestionI) {
    this.activeSuggestionI = activeSuggestionI;
  }
  /**
   * Reset the currently activeSuggestion if it is the same as suggestion
   * @param  {string} suggestion
   * @param  {Function} callback Called with the previously active suggestion
   * if the active suggestion was reset
   */
  deactivateSuggestion(suggestion, callback) {
    if (this.suggestions[this.activeSuggestionI] === suggestion) {
      const previouslyActiveSuggestion = this.suggestions[this.activeSuggestionI];
      this.activeSuggestionI = null;
      if (callback) {
        callback(previouslyActiveSuggestion);
      }
    }
  }
  /**
   * Reset suggestions and the current activeSuggestion accordingly
   * @param  {Function} callback Called with the new suggestions when the suggestions are reset
   */
  resetSuggestions(callback) {
    this.setSuggestions([]);
    this.setActiveSuggestionI(null);
    if (callback) {
      callback(this.suggestions);
    }
  }
  /**
   * Activates the next(in a circular manner) suggestion
   * @param  {boolean} dec=false Should it activate the previous suggestion default is next
   * @param  {Function} callback Called with the previous and next
   * suggestion once the next suggestion has been activated
   */
  incrementActiveSuggestion(dec = false, callback) {
    const newActiveSuggestionI = getNextIndexCircular(
      this.suggestions,
      this.activeSuggestionI,
      dec
    );

    this.activateSuggestion(newActiveSuggestionI, callback);
  }
  /**
   * Accept the currently active suggestion as the new Query
   * @param  {string} [postFix=""] String to be added to the end of
   * the query once the suggestion is accepted
   * @param  {Function} callback Called with the new suggestions
   * once the query and the suggestions are updated
   */
  acceptActiveSuggestion(postFix = '', callback) {
    this.setQuery(this.suggestions[this.activeSuggestionI] + postFix);
    this.resetSuggestions();
    if (callback) {
      callback(this.query, this.suggestions);
    }
  }

  /**
   * Set a new active suggestion
   * @param  {(number | string)} suggestion New Suggestion index or one of the
   * strings inside suggestions
   * @param  {Function} callback Called once the new active suggestion index has been set
   * with the previously and newly active suggestion
   */
  activateSuggestion(suggestion, callback) {
    const previouslyActiveSuggestion = this.suggestions[this.activeSuggestionI];

    if (typeof suggestion === 'number') {
      this.setActiveSuggestionI(suggestion);
    } else if (suggestion == null || this.suggestions.indexOf(suggestion) === -1) {
      this.setActiveSuggestionI(null);
    } else {
      this.setActiveSuggestionI(this.suggestions.indexOf(suggestion));
    }

    if (callback) {
      callback(previouslyActiveSuggestion, this.suggestions[this.activeSuggestionI]);
    }
  }
}
