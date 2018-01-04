import { splitLastWord, getLastWordAutoCompleteSuggestions, getNextIndexCircular } from '../utils';

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
    const suggestions = await getLastWordAutoCompleteSuggestions(
      'the star of today',
      asyncGetSuggestions
    );
    expect(suggestions).toEqual(['the star of pretoday', 'the star of todaypost']);
  });
});

describe('Get circular index', () => {
  test('should return null if currentIndex is 0 and we decrement', () => {
    const nextIndex = getNextIndexCircular([1, 2, 3], 0, true);
    expect(nextIndex).toBeNull();
  });

  test('should return null if currentIndex is last element and we increment', () => {
    const nextIndex = getNextIndexCircular([1, 2, 3], 2, false);
    expect(nextIndex).toBeNull();
  });

  test('should return the last element if currentIndex is null and we decrement', () => {
    const array = [1, 2, 3];
    const nextIndex = getNextIndexCircular(array, null, true);
    expect(nextIndex).toBe(array.length - 1);
  });

  test('should return 0 if the currentIndex is null and we increment', () => {
    const nextIndex = getNextIndexCircular([1, 2, 3], null, false);
    expect(nextIndex).toBe(0);
  });
});
