import { getSuggestionsTemplate } from '../templates';

describe('getSuggestionsTemplate', () => {
  test('should return concatenated suggestion list items', () => {
    expect(getSuggestionsTemplate(['ha'])).toBe("<li class='suggestion'>ha</li>\n");
  });
});
