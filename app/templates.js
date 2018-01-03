export function getSuggestionsTemplate(suggestions) {
  return suggestions.reduce((template, suggestion) => `${template}<li class='suggestion'> ${suggestion} </li>\n`, '');
}
