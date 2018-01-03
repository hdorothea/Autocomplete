import { getSuggestions } from '../fakeBackend';

async function getUniqueSuggestionsFakeBackend(suggestions) {
  suggestions = await getSuggestions(suggestions);
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
  const lastWordSuggestions = await asyncGetSuggestions(last);
  const result = lastWordSuggestions.map(lastWordSuggestion => `${rest} ${lastWordSuggestion}`);
  return result;
}

export async function getLastWordAutoCompleteSuggestionsFakeBackend(input, unique=true) {
  return getLastWordAutoCompleteSuggestions(input, unique ? getSuggestions : getUniqueSuggestionsFakeBackend );
}