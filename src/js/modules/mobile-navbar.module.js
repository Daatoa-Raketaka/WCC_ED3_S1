export function activateMobileMenu(navbar = new HTMLElement()) {
  const classContainsActive = navbar.classList.contains('active')
  if (!classContainsActive)
    navbar.classList.add('active')
}

export function deactivateMobileMenu(navbar = new HTMLElement()) {
  const classContainsActive = navbar.classList.contains('active')
  if (classContainsActive)
    navbar.classList.remove('active')
}