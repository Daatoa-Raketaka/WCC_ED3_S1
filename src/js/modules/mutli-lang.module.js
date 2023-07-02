export function onLangsClick(langs = new HTMLElement()) {
  const classContainsActive = langs.classList.contains('active')
  if (!classContainsActive)
    langs.classList.add('active')
  else langs.classList.remove('active')
}