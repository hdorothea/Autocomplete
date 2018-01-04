import Model from '../model';

describe('Model', () => {
  test('should set the correct suggestion', () => {
    const model = new Model();
    model.suggestions = ['Hallo', 'Lola', 'Buh'];
    model.activateSuggestion('Hallo', () => null);
    expect(model.activeSuggestionI).toBe(0);
    model.activateSuggestion(2, () => null);
    expect(model.activeSuggestionI).toBe(2);
  });
});
