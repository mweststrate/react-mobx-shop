import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { reaction } from 'mobx'

import createRouter from './utils/router'
import App from './components/App'
import './index.css'

import ShopStore from './stores/ShopStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const shop = new ShopStore(fetcher)

ReactDOM.render(
  <Provider shop={shop}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reaction(
  () => shop.view.currentUrl,
  (path) => {
    if (window.location.pathname !== path)
      window.history.pushState(null, null, path)
  }
)

const router = createRouter({
  "/book/:bookId": ({bookId}) => shop.view.openBookPageById(bookId),
  "/cart":         shop.view.openCartPage,
  "/":             shop.view.openBooksPage
})

window.onpopstate = function historyChange(ev) {
  if (ev.type === "popstate")
    router(window.location.pathname)
}

router(window.location.pathname)
