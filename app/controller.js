export class Controller {
  constructor(model, queryInputView, suggestionView) {
    this.queryInputView = queryInputView;
    this.suggestionView = suggestionView;
    this.model = model;
  }

  run() {
    this.queryInputView.bindInputChange(this.updateQuery.bind(this));
    this.suggestionView.bindMouseOver(this.updateActiveSuggestion.bind(this));
  }

  updateQuery(newQuery) {
    this.model.updateQuery(newQuery, suggestions => this.suggestionView.update(suggestions));
  }

  updateActiveSuggestion(activeSuggestion) {
    this.model.updateActiveSuggestion(activeSuggestion, activeSuggestion =>
      this.suggestionView.updateActive(activeSuggestion));
  }
}
