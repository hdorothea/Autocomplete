export function surroundTextOnSlices(text, slices, surround) {
  if (!(surround instanceof Array)) {
    surround = [surround, surround];
  }

  let lastCloseI = 0;
  const result = [];
  for (const slice of slices) {
    const [currentOpenI, currentCloseI] = slice;
    result.push(text.slice(lastCloseI, currentOpenI));
    result.push(`${surround[0]}${text.slice(currentOpenI, currentCloseI)}${surround[1]}`);
    lastCloseI = currentCloseI;
  }

  result.push(text.slice(lastCloseI, text.length));
  return result.join('');
}

export function getSuggestionsTemplate(suggestions, lastWordDiffs) {
  return suggestions.reduce(
    (template, suggestion, i) =>
      `${template}<li class='suggestion'>${
        (lastWordDiffs ? lastWordDiffs[i] : false)
          ? surroundTextOnSlices(suggestion, lastWordDiffs[i], ['<b>', '</b>'])
          : suggestion
      }</li>\n`,
    ''
  );
}
