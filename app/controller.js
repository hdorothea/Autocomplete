export class Controller {
  constructor(model, queryInputView, suggestionView) {
    this.queryInputView = queryInputView;
    this.suggestionView = suggestionView;
    this.model = model;
  }

  run() {
    this.queryInputView.bindInputChange(this.updateQuery.bind(this));
    // bind the handlers for the suggestionView
  }

  updateQuery(newQuery) {
    this.model.updateQuery(newQuery, (suggestions) => this.suggestionView.update(suggestions));
  }
}
