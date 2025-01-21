document.addEventListener('click', async ({ target }) => {
  if (!target.matches('.copy-button')) return

  const name = target.id.replace('s-email', '')
  const email = `${name}@people-and-code.com`

  try {
    await navigator.clipboard.writeText(email)
    target.dataset.originalText = target.textContent
    target.textContent = 'Copied!'
    setTimeout(() => {
      target.textContent = target.dataset.originalText
      delete target.dataset.originalText
    }, 2000)
  } catch {
    target.textContent = email
  }
})
