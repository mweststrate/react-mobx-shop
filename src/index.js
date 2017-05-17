import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { observable, reaction } from 'mobx'
import { onSnapshot, onAction, onPatch, applySnapshot, applyAction, applyPatch } from 'mobx-state-tree'

import createRouter from './utils/router'
import App from './components/App'
import './index.css'

import { ShopStore } from './stores/ShopStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const shop = ShopStore.create({}, {
  fetch: fetcher,
  alert: m => console.log(m) // Noop for demo: window.alert(m)
})

window.shop = shop // for playing around

/**
 * "DevToos"
 */

const history = {
  snapshots: observable.shallowArray(),
  actions: observable.shallowArray(),
  patches: observable.shallowArray()
}

onSnapshot(shop, s => history.snapshots.unshift({
  data: s,
  onClick() {
    applySnapshot(shop, this.data)
  }
}))
onPatch(shop, s => history.patches.unshift({
  data: s,
  onClick() {
    applyPatch(shop, this.data)
  }
}))
onAction(shop, s => history.actions.unshift({
  data: s,
  onClick() {
    applyAction(shop, this.data)
  }
}))

/**
 * Rendering
 */
ReactDOM.render(
  <Provider shop={shop} history={history}>
    <App />
  </Provider>,
  document.getElementById('root')
)

/**
 * Routing
 */

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
