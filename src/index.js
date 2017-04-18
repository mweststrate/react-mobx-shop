import React from 'react'
import ReactDOM from 'react-dom'
import { reaction } from 'mobx'
import { Provider } from 'mobx-react'
import { Router } from 'director';

import App from './components/App'
import './index.css'

import ShopStore from './stores/ShopStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const shop = new ShopStore(fetcher)
window.shop = shop // for demo / debug

// Render shop to DOM
ReactDOM.render(
  <Provider shop={shop}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// React to route changes
new Router({
    "/book/:bookId": (bookId) => shop.view.openBookPageById(bookId),
    "/cart": shop.view.openCartPage,
}).configure({
    notfound: shop.view.openBooksPage,
    html5history: true
}).init()

// Render shop to history
reaction(
  () => shop.view.currentUrl,
  (path) => {
    if (window.location.pathname !== path)
      window.history.pushState(null, null, path)
  }
)
