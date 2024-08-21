/* eslint-disable no-undef */
import { orderHeaders } from './browser-validation.js'

describe('validation', () => {
  let headers = []
  it('landmark rules', () => {
    headers = [
      {
        element: 'header',
      },
      {
        element: 'nav',
      },
      {
        element: 'nav',
      },
      {
        element: 'header',
      },
      {
        element: 'nav',
      },
      {
        element: 'main',
      },
      {
        element: 'header',
      },
      {
        element: 'h1',
      },
      {
        element: 'h4',
      },
      {
        element: 'h4',
      },
      {
        element: 'h2',
      },
      {
        element: 'h2',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h2',
      },
      {
        element: 'h2',
      },
      {
        element: 'h2',
      },
      {
        element: 'h3',
      },
      {
        element: 'h3',
      },
      {
        element: 'h2',
      },
      {
        element: 'nav',
      },
      {
        element: 'h2',
      },
      {
        element: 'header',
      },
      {
        element: 'footer',
      },
      {
        element: 'h3',
      },
      {
        element: 'footer',
      },
      {
        element: 'h4',
      },
    ]
    expect(orderHeaders(headers)).toEqual(headers)
  })
})
