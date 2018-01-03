import { QueryInputView, SuggestionView } from '../view';

describe('QueryInputView', () => {
  let testQueryInputView;

  beforeEach(() => {
    document.body.innerHTML = "<input class='query-input' type='text'/>";
    testQueryInputView = new QueryInputView();
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
    document.body.innerHTML = `<ul class='suggestions'> 
  <li class='suggestion'> <div> <div class='num'> Number </div> Hallo </div> </li> 
  <li class='suggestion'>Lola</li> 
</ul`;
    testSuggestionView = new SuggestionView();
  });

  test('should select the correct element', () => {
    expect(testSuggestionView.el.classList).toContain('suggestions');
    expect(testSuggestionView.el.tagName).toBe('UL');
  });

  test('should add the active class to the correct suggestion element', () => {
    testSuggestionView.updateActive('Lola');
    expect(testSuggestionView.el.querySelector('.active').textContent).toBe('Lola');
  });
});