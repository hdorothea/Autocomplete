import Model from '../model';

describe('Model', () => {
  test('should set the correct suggestion', () => {
    const model = new Model();
    model.suggestions = ['Hallo', 'Lola', 'Buh'];
    model.updateActiveSuggestion('Hallo', () => null);
    expect(model.activeSuggestionI).toBe(0);
    model.updateActiveSuggestion(2, () => null);
    expect(model.activeSuggestionI).toBe(2);
  });
});
