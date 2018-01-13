import { getSuggestions as getSuggestionsFakeBackend } from '../fakeBackend';

/**
 * Split a string into the space seperated last word and its rest
 * @param  {!string} input  Input string to split
 * @return {string[]} Returns an array containing two strings: rest and last word
 */
export function splitLastWord(input) {
  const splitInput = input.split(' ');
  const last = splitInput.pop();
  const rest = splitInput.join(' ');
  return [rest, last];
}

/**
 * Return a function that retries an asynchronous function up to maxRetryN times
 * @param  {!Function} asyncFunc An asynchronous function to retry
 * @param  {number} [maxRetryN=0] How often should the function be retried
 * @param {Function} [onFailure=(err) => { throw err; }] Function that is called with the error
 * if the maxRetryNth retry fails
 * @return {Function}
 */
export function asyncRetry(
  asyncFunc,
  maxRetryN = 0,
  onFailure = (err) => {
    throw err;
  }
) {
  let retryN = 0;
  let lastError;
  return async function (...args) {
    while (retryN <= maxRetryN) {
      try {
        const result = await asyncFunc(...args);
        return result;
      } catch (err) {
        retryN += 1;
        lastError = err;
      }
    }

    if (onFailure) {
      return onFailure(lastError);
    }
  };
}

/**
 * Finds the index slices of the differences between
 * sequence and first occurence of subsequence in sequence
 * @param {!(Array|string)} sequence
 * @param {!(Array|string)} subSequence
 * @return {number[][]} An array of difference slices
 */
export function getSubSequenceDiff(sequence, subSequence) {
  const subSequenceStart = sequence.indexOf(subSequence);
  if (subSequenceStart === -1) {
    return [[0, sequence.length]];
  }

  if (sequence.length === subSequence.length) {
    return [];
  }

  return [[0, subSequenceStart], [subSequenceStart + subSequence.length, sequence.length]];
}

/**
 * Returns an array without its duplicate values
 * @param  {Array} array Input array with possibly duplicate values
 * @return {Array} Array with only unique values
 */
export function uniquify(array) {
  return [...new Set(array)];
}

/**
 * Wrapper function for the fakeBackend suggestion function
 * @param  {boolean} [unique=true] Force unique suggestions
 * @param  {number} [retryN=0] How often to retry the suggestion function
 * @return {Function}
 */
export function getGetSuggestions(unique = true, retryN = 0) {
  return async function (input) {
    let suggestions = await asyncRetry(getSuggestionsFakeBackend, retryN, () => [])(input);

    if (unique) {
      suggestions = uniquify(suggestions);
    }

    return suggestions;
  };
}

/**
 * Returns the next index in a circular manner
 * i.e after last index increment it returns null after null increment it returns the first index
 * after first index decrement it returns null after null decrement it returns the last index
 * @param  {!(array | string)} sequence Sequence to circle through
 * @param  {!number} currentIndex Index to get the next circular index from
 * @param  {boolean} [dec=false] Should it decrement? Default is increment
 * @return {number | null}
 */
export function getNextIndexCircular(sequence, currentIndex, dec = false) {
  if (currentIndex == null) {
    return dec ? sequence.length - 1 : 0;
  }

  const newIndex = dec ? currentIndex - 1 : currentIndex + 1;
  return newIndex < 0 || newIndex >= sequence.length ? null : newIndex;
}

/**
 * Takes a string and an array of superstrings of the last word
 * and returns the index slices of the differences between the last word and the superstrings
 * @param  {!string} input
 * @param  {string[]} lastWordSuperStrings Array of superstrings of the last word
 * @return {number[][]} An array of difference slices
 */
export function getLastWordDiffSlices(input, lastWordSuperStrings) {
  const [rest, last] = splitLastWord(input);

  return lastWordSuperStrings.map(superString =>
    getSubSequenceDiff(superString, last).map(diffSlice =>
      diffSlice.map(diffI => diffI + (rest ? rest.length + 1 : 0))));
}

/**
 * Returns an array where the last word of input has been autocompleted using the suggestionFunc
 * @param  {!string} input
 * @param  {!Function} suggestionFunc Function to get the suggestions from
 * @param  {boolean} [diff=true] Should it return the difference slices
 * between original and last word
 * @return {Array} If diff is true a nested array containing suggestions and diff
 * slices else an array containing suggestions
 */
export async function getLastWordSuggestions(input, suggestionFunc, diff = true) {
  const [rest, last] = splitLastWord(input);
  if (!last) {
    return diff ? [[], []] : [];
  }

  const lastWordSuggestions = await suggestionFunc(last);
  const suggestions = lastWordSuggestions.map(suggestion => `${rest ? `${rest} ` : ''}${suggestion}`);
  let diffs;
  if (diff) {
    diffs = getLastWordDiffSlices(input, lastWordSuggestions);
  }
  return diff ? [suggestions, diffs] : suggestions;
}
