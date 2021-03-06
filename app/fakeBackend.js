const FAILURE_COEFF = 10;
const MAX_SERVER_LATENCY = 200;

function getRandomBool(n) {
  const maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

export function getSuggestions(text) {
  const pre = 'pre';
  const post = 'post';
  const results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject(new Error('Fake backend error'));
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}
