import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import { StaticRouter as Router } from 'react-router-dom'

import BookStore from "../stores/BookStore"
import CartStore from "../stores/CartStore"

it('renders without crashing', () => {
  const bookStore = new BookStore()
  const cartStore = new CartStore(bookStore)

  const div = document.createElement('div')
  ReactDOM.render(
    <Provider bookStore={bookStore} cartStore={cartStore}>
      <Router context={{}}>
        <App bookStore={new BookStore()} />
      </Router>
    </Provider>,
    div
  )
})
