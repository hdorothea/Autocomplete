import { getLastWordAutoCompleteSuggestionsFakeBackend, getNextIndexCircular } from './utils/utils';

export default class Model {
  setQuery(query) {
    this.query = query;
  }

  setSuggestions(suggestions) {
    this.suggestions = suggestions;
  }

  async updateSuggestions() {
    this.suggestions = await getLastWordAutoCompleteSuggestionsFakeBackend(this.query);
  }

  async updateQuery(newQuery, callback) {
    this.setQuery(newQuery);
    await this.updateSuggestions();
    this.setActiveSuggestionI(null);
    callback(this.suggestions);
  }

  setActiveSuggestionI(activeSuggestionI) {
    this.activeSuggestionI = activeSuggestionI;
  }

  deactivateSuggestion(suggestion, callback) {
    if (this.suggestions[this.activeSuggestionI] === suggestion) {
      this.activeSuggestionI = null;
      callback(this.suggestions[this.activeSuggestionI]);
    }
  }

  resetSuggestions(callback) {
    this.setSuggestions([]);
    this.activeSuggestionI = null;
    callback(this.suggestions);
  }

  incrementActiveSuggestion(dec = false, callback) {
    const newActiveSuggestionI = getNextIndexCircular(
      this.suggestions,
      this.activeSuggestionI,
      dec
    );
    this.updateActiveSuggestion(newActiveSuggestionI, callback);
  }

  updateActiveSuggestion(activeSuggestion, callback) {
    if (typeof activeSuggestion === 'number') {
      this.setActiveSuggestionI(activeSuggestion);
    } else if (activeSuggestion == null || this.suggestions.indexOf(activeSuggestion) === -1) {
      this.setActiveSuggestionI(null);
    } else {
      this.setActiveSuggestionI(this.suggestions.indexOf(activeSuggestion));
    }

    callback(this.suggestions[this.activeSuggestionI]);
  }
}
