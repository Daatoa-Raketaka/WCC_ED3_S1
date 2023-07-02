import { COLOR_SCHEME_STORAGE_KEY } from '../utils/index.js'

export function toggleColorScheme(rootElement = new HTMLHtmlElement()) {
  const themeIsDark = rootElement.classList.contains('dark')
  rootElement.classList = ''
  if (themeIsDark) {
    rootElement.classList.add('light')
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, 'light')
  } else {
    rootElement.classList.add('dark')
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, 'dark')
  }
}

export function detectOSColorScheme(rootElement = new HTMLHtmlElement()) {
  const themeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  rootElement.classList = ''
  if (themeIsDark) {
    rootElement.classList.add('dark')
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, 'dark')
  } else {
    rootElement.classList.add('light')
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, 'light')
  }
}

export function listenOnColorSchemeChange(rootElement = new HTMLHtmlElement()) {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => toggleColorScheme(rootElement))
}