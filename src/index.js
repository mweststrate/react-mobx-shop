import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { reaction } from 'mobx'

import createRouter from './utils/router'
import App from './components/App'
import './index.css'

import BookStore from './stores/BookStore'
import CartStore from './stores/CartStore'
import ViewStore from './stores/ViewStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const bookStore = new BookStore(fetcher)
const cartStore = new CartStore(bookStore)
const viewStore = new ViewStore(bookStore)

ReactDOM.render(
  <Provider bookStore={bookStore} cartStore={cartStore} viewStore={viewStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

bookStore.loadBooks()

reaction(
  () => viewStore.currentUrl,
  (path) => {
    if (window.location.pathname !== path)
      window.history.pushState(null, null, path)
  }
)

const router = createRouter({
  "/book/:bookId": ({bookId}) => viewStore.openBookPageById(bookId),
  "/cart":         viewStore.openCartPage,
  "/":             viewStore.openBooksPage
})

window.onpopstate = function historyChange(ev) {
  if (ev.type === "popstate")
    router(window.location.pathname)
}

router(window.location.pathname)
