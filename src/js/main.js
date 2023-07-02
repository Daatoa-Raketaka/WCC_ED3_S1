import { detectOSColorScheme, listenOnColorSchemeChange } from './modules/theme.module.js'
import { activateMobileMenu, deactivateMobileMenu } from './modules/mobile-navbar.module.js'
import { BURGER_BUTTON, NAVBAR, NAVBAR_EXIT, ROOT_ELEMENT } from './utils/index.js'

function main() {
  try {
    window.addEventListener('load', () => console.log('%cDaatoa Raketaka', 'color: #0096ff; font-size: 32px;'))
    detectOSColorScheme(ROOT_ELEMENT)
    listenOnColorSchemeChange(ROOT_ELEMENT)

    BURGER_BUTTON.addEventListener('click', () => activateMobileMenu(NAVBAR))
    NAVBAR_EXIT.addEventListener('click', () => deactivateMobileMenu(NAVBAR))
  } catch (err) { console.log('CATCHED ERROR --->', err) }
}

main()