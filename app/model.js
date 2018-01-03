import { getLastWordAutoCompleteSuggestionsFakeBackend } from './utils/utils';

export default class Model {

  setQuery(query) {
    this.query = query;
  }

  async setSuggestions() {
    this.suggestions = await getLastWordAutoCompleteSuggestionsFakeBackend(this.query);
  }

  async updateQuery(newQuery, callback) {
    this.setQuery(newQuery);
    await this.setSuggestions();
    callback(this.suggestions);
  }

  setActiveSuggestionI(activeSuggestionI) {
    if (activeSuggestionI < this.suggestions.length) {
      this.activeSuggestionI = activeSuggestionI;
    }
  }

  updateActiveSuggestion(activeSuggestion, callback) {
    let activeSuggestionI;
    if (typeof activeSuggestion === 'number') {
      activeSuggestionI = activeSuggestion;
    } else {
      activeSuggestionI = this.suggestions.indexOf(activeSuggestion);
    }

    this.setActiveSuggestionI(activeSuggestionI);
    callback(this.suggestions[this.activeSuggestionI]);
  }
}
