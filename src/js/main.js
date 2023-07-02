import { detectOSColorScheme, listenOnColorSchemeChange } from './modules/theme.module.js'
import { activateMobileMenu, deactivateMobileMenu } from './modules/mobile-navbar.module.js'
import { BURGER_BUTTON, FLOATING_LINKS, LANGS, MULTILANG, NAVBAR, NAVBAR_EXIT, ROOT_ELEMENT } from './utils/index.js'
import { onLangsClick } from './modules/mutli-lang.module.js'
import { hoverFloatingLink, unhoverFloatingLink } from './modules/floating-navbar.module.js'

function main() {
  try {
    window.addEventListener('load', () => console.log('%cDaatoa Raketaka', 'color: #0096ff; font-size: 32px;'))
    detectOSColorScheme(ROOT_ELEMENT)
    listenOnColorSchemeChange(ROOT_ELEMENT)

    BURGER_BUTTON.addEventListener('click', () => activateMobileMenu(NAVBAR))
    NAVBAR_EXIT.addEventListener('click', () => deactivateMobileMenu(NAVBAR))

    MULTILANG.addEventListener('click', () => onLangsClick(LANGS))

    FLOATING_LINKS.forEach(link => {
      link.addEventListener('mouseenter', () => hoverFloatingLink(link))
      link.addEventListener('mouseleave', () => unhoverFloatingLink(link))
    })
  } catch (err) { console.log('CATCHED ERROR --->', err) }
}

main()