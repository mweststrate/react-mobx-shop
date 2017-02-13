import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'

import BookStore from "../stores/BookStore"
import CartStore from '../stores/CartStore'
import ViewStore from '../stores/ViewStore'

it('renders without crashing', () => {
  const bookStore = new BookStore(() => Promise.reject("Not supported"))
  const cartStore = new CartStore(bookStore)
  const viewStore = new ViewStore(bookStore)

  const div = document.createElement('div')
  ReactDOM.render(
    <Provider bookStore={bookStore} cartStore={cartStore} viewStore={viewStore}>
      <App />
    </Provider>,
    div)
})
