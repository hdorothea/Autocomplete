export default class Controller {
  constructor(model, queryInputView, suggestionView, suggestionContainerView) {
    this.queryInputView = queryInputView;
    this.suggestionView = suggestionView;
    this.suggestionContainerView = suggestionContainerView;
    this.model = model;
  }

  run() {
    this.queryInputView.bindInputChange(this.updateQuery.bind(this));
    this.suggestionContainerView.bindOutSideClick(document, this.resetSuggestions.bind(this));
    this.queryInputView.bindKeyDown([
      { keyCode: 38, callback: () => this.incrementActiveSuggestion(true) },
      { keyCode: 40, callback: () => this.incrementActiveSuggestion(false) },
      { keyCode: 13, callback: this.submitOrAcceptActiveSuggestion.bind(this) }
    ]);
    this.suggestionView.bindMouse('mouseover', this.activateSuggestion.bind(this));
    this.suggestionView.bindMouse('mouseout', this.deactivateSuggestion.bind(this));
    this.suggestionView.bindClick(this.acceptActiveSuggestion.bind(this));
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
      this.suggestionView.switchActive.bind(this.suggestionView)
    );
  }

  deactivateSuggestion(suggestion) {
    this.model.deactivateSuggestion(
      suggestion,
      this.suggestionView.unmarkActive.bind(this.suggestionView)
    );
  }

  activateSuggestion(activeSuggestion) {
    this.model.activateSuggestion(
      activeSuggestion,
      this.suggestionView.switchActive.bind(this.suggestionView)
    );
  }

  acceptActiveSuggestion() {
    if (this.model.activeSuggestionI !== null) {
      this.model.acceptActiveSuggestion(' ', (newQuery, newSuggestions) => {
        this.queryInputView.setValue(newQuery);
        this.suggestionView.update(newSuggestions);
      });
    }
  }

  submitOrAcceptActiveSuggestion() {
    if (this.model.activeSuggestionI !== null) {
      this.acceptActiveSuggestion();
    } else {
      this.model.submit();
    }
  }
}
