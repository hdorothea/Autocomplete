import { getSuggestions as getSuggestionsFakeBackend } from '../fakeBackend';

async function getUniqueSuggestionsFakeBackend(suggestions) {
  suggestions = await getSuggestionsFakeBackend(suggestions);
  return [...new Set(suggestions)];
}

export function splitLastWord(input) {
  const splitInput = input.split(' ');
  const last = splitInput.pop();
  const rest = splitInput.join(' ');
  return [rest, last];
}

export async function getLastWordAutoCompleteSuggestions(input, asyncGetSuggestions) {
  const [rest, last] = splitLastWord(input);
  if (!last) {
    return rest ? [rest] : [];
  }
  const lastWordSuggestions = await asyncGetSuggestions(last);
  const result = lastWordSuggestions.map(lastWordSuggestion => `${rest} ${lastWordSuggestion}`);
  return result;
}

export async function getLastWordAutoCompleteSuggestionsFakeBackend(input, unique = true) {
  return getLastWordAutoCompleteSuggestions(
    input,
    unique ? getSuggestionsFakeBackend : getUniqueSuggestionsFakeBackend
  );
}

export function getNextIndexCircular(array, currentIndex, dec = false) {
  if (currentIndex == null) {
    return dec ? array.length - 1 : 0;
  }

  const newIndex = dec ? currentIndex - 1 : currentIndex + 1;
  return (newIndex < 0 || newIndex >= array.length) ? null : newIndex;
}
