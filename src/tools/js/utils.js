export const sortBy = ({ arr, prop, dir = 'asc' }) => {
  return dir === 'asc'
    ? arr.sort((a, b) => {
        const x = a[prop]
        const y = b[prop]
        return x - y
      })
    : arr.sort((a, b) => {
        const x = a[prop]
        const y = b[prop]
        return y - x
      })
}

export const htmlStringToDomElement = (htmlString) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  return doc.body
}
