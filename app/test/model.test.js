import Model from '../model';

describe('Model', () => {
  const model = new Model();

  beforeEach(() => {
    model.suggestions = ['Hallo', 'Lola', 'Buh'];
    model.activeSuggestionI = 0;
  });

  test('activateSuggestion should set the correct suggestion', () => {
    model.activateSuggestion('Hallo', () => null);
    expect(model.activeSuggestionI).toBe(0);
    model.activateSuggestion(2, () => null);
    expect(model.activeSuggestionI).toBe(2);
  });

  test('acceptActiveSuggestion should set the correct query', () => {
    const postFix = ' ';
    model.acceptActiveSuggestion(postFix);
    expect(model.query).toEqual(`Hallo${postFix}`);
  });

  test('acceptActiveSuggestion should reset the suggestions', () => {
    model.acceptActiveSuggestion();
    expect(model.suggestions).toEqual([]);
    expect(model.activeSuggestionI).toBeNull();
  });

  test('resetSuggestions should set suggestions to empty array', () => {
    model.resetSuggestions();
    expect(model.suggestions).toEqual([]);
  });

  test('resetSuggestions should set activeSuggestionI to 0', () => {
    model.resetSuggestions();
    expect(model.activeSuggestionI).toBeNull();
  });

  test('deactivateSuggestion should set activeSuggestionI to null if suggestion is at activeSuggestionI', () => {
    model.deactivateSuggestion('Lola');
    expect(model.activeSuggestionI).toBe(0);
    model.deactivateSuggestion('Hallo');
    expect(model.activeSuggestionI).toBeNull();
  });
});
