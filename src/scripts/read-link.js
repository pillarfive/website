function markLinkRead(link) {
  if (!link.querySelector('span.read-marker')) {
    let newChild = document.createElement('span')
    newChild.textContent = 'READ'
    newChild.classList.add('read-marker')
    link.insertBefore(newChild, link.firstChild)
  }
}

document.querySelectorAll('a').forEach((link) => {
  if (link.getAttribute('href')[0] !== '#') {
    link.addEventListener('click', () => {
      markLinkRead(link)
      localStorage.setItem(link.href, 'visited')
    })
  }

  if (localStorage.getItem(link.href) === 'visited') markLinkRead(link)
})
