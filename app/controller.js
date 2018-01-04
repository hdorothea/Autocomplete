export default class Controller {
  constructor(model, queryInputView, suggestionView) {
    this.queryInputView = queryInputView;
    this.suggestionView = suggestionView;
    this.model = model;
  }

  run() {
    this.queryInputView.bindInputChange(this.updateQuery.bind(this));
    this.queryInputView.bindBlur(this.resetSuggestions.bind(this));
    this.queryInputView.bindKeyDown(
      () => this.incrementActiveSuggestion(true),
      () => this.incrementActiveSuggestion(false)
    );
    this.suggestionView.bindMouse('mouseover', this.updateActiveSuggestion.bind(this));
    this.suggestionView.bindMouse('mouseout', this.deactivateSuggestion.bind(this));
  }

  resetSuggestions() {
    this.model.resetSuggestions(this.suggestionView.update.bind(this.suggestionView));
  }

  updateQuery(newQuery) {
    this.model.updateQuery(newQuery, this.suggestionView.update.bind(this.suggestionView));
  }

  incrementActiveSuggestion(dec = false) {
    this.model.incrementActiveSuggestion(
      dec,
      this.suggestionView.updateActive.bind(this.suggestionView)
    );
  }

  deactivateSuggestion(suggestion) {
    this.model.deactivateSuggestion(
      suggestion,
      this.suggestionView.updateActive.bind(this.suggestionView)
    );
  }

  updateActiveSuggestion(activeSuggestion) {
    this.model.updateActiveSuggestion(
      activeSuggestion,
      this.suggestionView.updateActive.bind(this.suggestionView)
    );
  }
}
