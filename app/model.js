import { getLastWordAutoCompleteSuggestionsFakeBackend, getNextIndexCircular } from './utils/utils';

export default class Model {
  setQuery(query) {
    this.query = query;
  }

  setSuggestions(suggestions) {
    this.suggestions = suggestions;
  }

  async updateSuggestions() {
    const suggestions = await getLastWordAutoCompleteSuggestionsFakeBackend(this.query, true);
    this.setSuggestions(suggestions);
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
      const previouslyActiveSuggestion = this.suggestions[this.activeSuggestionI];
      this.activeSuggestionI = null;
      callback(previouslyActiveSuggestion);
    }
  }

  resetSuggestions(callback) {
    this.setSuggestions([]);
    this.setActiveSuggestionI(null);
    callback(this.suggestions);
  }

  incrementActiveSuggestion(dec = false, callback) {
    const newActiveSuggestionI = getNextIndexCircular(
      this.suggestions,
      this.activeSuggestionI,
      dec
    );

    this.activateSuggestion(newActiveSuggestionI, callback);
  }

  activateSuggestion(suggestion, callback) {
    const previouslyActiveSuggestion = this.suggestions[this.activeSuggestionI];

    if (typeof suggestion === 'number') {
      this.setActiveSuggestionI(suggestion);
    } else if (suggestion == null || this.suggestions.indexOf(suggestion) === -1) {
      this.setActiveSuggestionI(null);
    } else {
      this.setActiveSuggestionI(this.suggestions.indexOf(suggestion));
    }

    callback(previouslyActiveSuggestion, this.suggestions[this.activeSuggestionI]);
  }
}
