import { QueryInputView, SuggestionView, SuggestionContainerView } from '../view';

describe('QueryInputView', () => {
  let testQueryInputView;

  beforeEach(() => {
    document.body.innerHTML = "<input class='query-input' type='text'/>";
    testQueryInputView = new QueryInputView();
  });

  test('should call the callback with the correct keyCode', () => {
    const testCallback = jest.fn();
    testQueryInputView.onKeyDown({ keyCode: 38, preventDefault: () => null }, [
      { keyCode: 38, callback: testCallback },
      { keyCode: 40 }
    ]);
    expect(testCallback).toBeCalled();
  });

  test('should select the correct element', () => {
    const result = testQueryInputView.el;
    expect(result.tagName).toBe('INPUT');
    expect(result.classList).toContain('query-input');
  });

  test('should set the input value', () => {
    testQueryInputView.setValue('hallo');
    const result = testQueryInputView.el.value;
    expect(result).toBe('hallo');
  });

  test('should get the input value ', () => {
    testQueryInputView.el.value = 'bye';
    const result = testQueryInputView.getValue();
    expect(result).toBe('bye');
  });

  test('should call the handler when the input changes', () => {
    const testFunction = jest.fn();
    testQueryInputView.bindInputChange(testFunction);
    testQueryInputView.el.dispatchEvent(new Event('input'));
    expect(testFunction).toHaveBeenCalled();
  });
});

describe('SuggestionView', () => {
  let testSuggestionView;

  beforeEach(() => {
    testSuggestionView = new SuggestionView();
  });

  test('should select the correct element', () => {
    document.body.innerHTML = "<ul class='suggestions'> </ul";
    testSuggestionView = new SuggestionView();
    expect(testSuggestionView.el.classList).toContain('suggestions');
    expect(testSuggestionView.el.tagName).toBe('UL');
  });

  test('should add the active class to the correct suggestion element', () => {
    document.body.innerHTML = `<ul class='suggestions'> 
    <li class='suggestion'> <div> <div class='num'> Number </div> Hallo </div> </li> 
    <li class='suggestion'>Lola</li> 
  </ul`;
    testSuggestionView = new SuggestionView();
    testSuggestionView.markActive('Lola');
    expect(testSuggestionView.el.querySelector('.active').textContent).toBe('Lola');
  });

  test('should remove the active class from the correct suggestion element', () => {
    document.body.innerHTML = `<ul class='suggestions'> 
    <li class='suggestion'> <div> <div class='num'> Number </div> Hallo </div> </li> 
    <li class='suggestion active'>Lola</li> 
  </ul`;
    testSuggestionView = new SuggestionView();
    testSuggestionView.unmarkActive('Lola');
    expect(testSuggestionView.el.querySelector('.active')).toBeNull();
  });
});

describe('Suggestion container view', () => {
  let suggestionContainerView;

  beforeEach(() => {
    document.body.innerHTML = '<div class="search-container"><div class="suggestion-container"><ul class=\'suggestions\'></ul><div width="200px" height="200px" class="test"></div></div>';
    suggestionContainerView = new SuggestionContainerView();
  });

  test('should select the correct element', () => {
    expect(suggestionContainerView.el.classList).toContain('suggestion-container');
    expect(suggestionContainerView.el.tagName).toBe('DIV');
  });
});
