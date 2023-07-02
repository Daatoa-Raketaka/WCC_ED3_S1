export function hoverFloatingLink(link = new HTMLElement()) {
  const info = link.querySelector('.info')
  if (!info.classList.contains('active'))
    info.classList.add('active')
}

export function unhoverFloatingLink(link = new HTMLElement()) {
  const info = link.querySelector('.info')
  if (info.classList.contains('active'))
    info.classList.remove('active')
}