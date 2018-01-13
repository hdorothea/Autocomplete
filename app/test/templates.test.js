import { getSuggestionsTemplate } from '../templates';

describe('getSuggestionsTemplate', () => {
  test('should return concatenated suggestion list items', () => {
    expect(getSuggestionsTemplate(['ha'])).toBe("<li class='suggestion'>ha</li>\n");
  });

  test('should emphasize the diffs', () => {
    expect(getSuggestionsTemplate(['ha'], [[[0, 1]]])).toBe("<li class='suggestion'><b>h</b>a</li>\n");
  });
});
