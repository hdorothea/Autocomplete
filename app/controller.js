export default class Controller {
  constructor(model, queryInputView, suggestionView, suggestionContainerView) {
    this.queryInputView = queryInputView;
    this.suggestionView = suggestionView;
    this.suggestionContainerView = suggestionContainerView;
    this.model = model;
  }
  /**
   * Bind eventlisteners and callbacks
   */
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
  /**
   * Reset the suggestions
   */
  resetSuggestions() {
    this.model.resetSuggestions(this.suggestionView.update.bind(this.suggestionView));
  }
  /**
   * Update the query to newQuery
   * @param  {string} newQuery
   */
  updateQuery(newQuery) {
    this.model.updateQuery(newQuery, this.suggestionView.update.bind(this.suggestionView));
  }
  /**
   * Activate the next/previous suggestion
   * @param  {boolean} dec=false Should I activate the previous suggestion default is next
   */
  incrementActiveSuggestion(dec = false) {
    this.model.incrementActiveSuggestion(
      dec,
      this.suggestionView.switchActive.bind(this.suggestionView)
    );
  }
  /**
   * Deactivate a suggestion
   * @param  {string} suggestion
   */
  deactivateSuggestion(suggestion) {
    this.model.deactivateSuggestion(
      suggestion,
      this.suggestionView.unmarkActive.bind(this.suggestionView)
    );
  }
  /**
   * Activate a new suggestion either by index or text content
   * @param  {(string|number)} activeSuggestion
   */
  activateSuggestion(activeSuggestion) {
    this.model.activateSuggestion(
      activeSuggestion,
      this.suggestionView.switchActive.bind(this.suggestionView)
    );
  }
  /**
   * Accept the currently active suggestion as a query
   */
  acceptActiveSuggestion() {
    if (this.model.activeSuggestionI !== null) {
      this.model.acceptActiveSuggestion(' ', (newQuery, newSuggestions) => {
        this.queryInputView.setValue(newQuery);
        this.suggestionView.update(newSuggestions);
      });
    }
  }
  /**
   * Accept the active suggestion if there is one otherwise submit it
   */
  submitOrAcceptActiveSuggestion() {
    if (this.model.activeSuggestionI !== null) {
      this.acceptActiveSuggestion();
    } else {
      // logic for submitting the query
    }
  }
}
