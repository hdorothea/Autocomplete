import { getSuggestions } from '../fakeBackend';

export function splitLastWord(input) {
  const splitInput = input.split(' ');
  const last = splitInput.pop();
  const rest = splitInput.join(' ');
  return [rest, last];
}

export async function getLastWordAutoCompleteSuggestions(input, asyncGetSuggestions) {
  const [rest, last] = splitLastWord(input);
  const lastWordSuggestions = await asyncGetSuggestions(last);
  const result = lastWordSuggestions.map(lastWordSuggestion => `${rest} ${lastWordSuggestion}`);
  return result;
}

export async function getLastWordAutoCompleteSuggestionsFakeBackend(input) {
  return getLastWordAutoCompleteSuggestions(input, getSuggestions);
}
