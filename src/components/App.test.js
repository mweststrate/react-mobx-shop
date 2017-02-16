import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'

import BookStore from "../stores/BookStore"
import CartStore from "../stores/CartStore"

it('renders without crashing', () => {
  const bookStore = new BookStore()
  const cartStore = new CartStore()

  const div = document.createElement('div')
  ReactDOM.render(
    <Provider bookStore={bookStore} cartStore={cartStore}>
      <App />
    </Provider>,
    div
  )
})