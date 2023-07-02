import { detectOSColorScheme, listenOnColorSchemeChange } from './modules/theme.module.js'
import { ROOT_ELEMENT } from './utils/index.js'

function main() {
  try {
    window.addEventListener('load', () => console.log('%cDaatoa Raketaka', 'color: #0096ff; font-size: 32px;'))
    detectOSColorScheme(ROOT_ELEMENT)
    listenOnColorSchemeChange(ROOT_ELEMENT)
  } catch (err) { console.log('CATCHED ERROR --->', err) }
}

main()