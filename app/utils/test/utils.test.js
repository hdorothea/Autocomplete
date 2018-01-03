import { splitLastWord, getLastWordAutoCompleteSuggestions } from '../utils';

describe('Split last word', () => {
  test('should return the first part and the last word', () => {
    const [rest, lastWord] = splitLastWord('pears, apples and kiwis');
    expect(rest).toBe('pears, apples and');
    expect(lastWord).toBe('kiwis');
  });

  test('should return the last word and empty with only one word as input', () => {
    const [rest, lastWord] = splitLastWord('pears');
    expect(rest).toBe('');
    expect(lastWord).toBe('pears');
  });

  test('should return empty string as last if whitespace at end', () => {
    const [rest, lastWord] = splitLastWord('pears, apples and kiwis ');
    expect(rest).toBe('pears, apples and kiwis');
    expect(lastWord).toBe('');
  });
});

describe('Get last word suggestions', () => {
  const asyncGetSuggestions = query => Promise.resolve([`pre${query}`, `${query}post`]);

  test('should return the first part concatenated with the suggestions for the last word', async () => {
    const suggestions = await getLastWordAutoCompleteSuggestions('the star of today', asyncGetSuggestions);
    expect(suggestions).toEqual(['the star of pretoday', 'the star of todaypost']);
  });
});
