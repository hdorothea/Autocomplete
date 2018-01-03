import { getLastWordAutoCompleteSuggestionsFakeBackend } from './utils/utils';

export class Model {
  setQuery(query) {
    this.query = query;
  }

  async setSuggestions(newSuggestions) {
    this.suggestions = newSuggestions
  }

  async updateQuery(newQuery, callback) {
    this.setQuery(newQuery);
    let newSuggestions = await getLastWordAutoCompleteSuggestionsFakeBackend(newQuery)
    console.log(newSuggestions);
    this.setSuggestions(newSuggestions)
    callback(newSuggestions);
  }
}
