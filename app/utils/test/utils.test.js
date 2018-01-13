import {
  splitLastWord,
  getNextIndexCircular,
  asyncRetry,
  getSubSequenceDiff,
  getLastWordDiffSlices,
  getLastWordSuggestions
} from '../utils';

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

function sucessAfterN(onNSucess, failureFunc, sucessFunc) {
  let n = 0;
  return function () {
    if (n < onNSucess) {
      n += 1;
      return failureFunc();
    } else {
      return sucessFunc();
    }
  };
}

describe('AsyncRetry', () => {
  test('should return the first succesfull result if within retryN', async () => {
    const fakeFunc = sucessAfterN(3, () => Promise.reject(), () => Promise.resolve(2));
    const result = await asyncRetry(fakeFunc, 3)();
    expect(result).toBe(2);
  });

  test('should throw error if succesfull result not within retryN', () => {
    const error = new Error('Hallo');
    const fakeFunc = sucessAfterN(4, () => Promise.reject(error), () => Promise.resolve(2));
    expect(asyncRetry(fakeFunc, 3)()).rejects.toEqual(error);
  });
});

describe('Get sub-sequence diff', () => {
  test('should return array with entire slice if substring not in string', () => {
    const result = getSubSequenceDiff('hallo', 'lola');
    expect(result).toEqual([[0, 5]]);
  });

  test('should return empty array if substring and string are the same', () => {
    const result = getSubSequenceDiff('hallo', 'hallo');
    expect(result).toEqual([]);
  });

  test('should return the differing part if substring at the beginning of string', () => {
    const result = getSubSequenceDiff('hallopost', 'hallo');
    expect(result).toEqual([[0, 0], [5, 9]]);
  });

  test('should return the differing part if the substring is at the end of the string', () => {
    const result = getSubSequenceDiff('prehallo', 'hallo');
    expect(result).toEqual([[0, 3], [8, 8]]);
  });

  test('should return the differing parts if the substring is in the middlel', () => {
    const result = getSubSequenceDiff('prehallopost', 'hallo');
    expect(result).toEqual([[0, 3], [8, 12]]);
  });

  test('should take only the first appearance into account', () => {
    const result = getSubSequenceDiff('prehallohallo', 'hallo');
    expect(result).toEqual([[0, 3], [8, 13]]);
  });
});

describe('get last word diff slices', () => {
  test('return an array with diff slices containing the correct ones', () => {
    const result = getLastWordDiffSlices('lola bu bar hallo', [
      'hallolola',
      'prehallo',
      'prehallopost'
    ]);
    expect(result[0]).toContainEqual([17, 21]);
    expect(result[1]).toContainEqual([12, 15]);
    expect(result[2]).toContainEqual([12, 15]);
    expect(result[2]).toContainEqual([20, 24]);
  });

  test('should return the entire superstring slice if input is an empty string', () => {
    const result = getLastWordDiffSlices('', ['hallola', 'lulla']);
    expect(result[0]).toContainEqual([0, 7]);
    expect(result[1]).toContainEqual([0, 5]);
  });

  test('should return an empty array if lastword superstrings are an empty array', () => {
    const result = getLastWordDiffSlices('lola', []);
    expect(result).toEqual([]);
  });
});

describe('Get last word suggestions', () => {
  test.only('Should return the suggestions for the last word concatenated to the rest', async () => {
    const result = await getLastWordSuggestions('Hallo lola', ha => [`pre${ha}post`, `pre${ha}`], false);
    expect(result).toEqual(['Hallo prelolapost', 'Hallo prelola']);
  });
});
