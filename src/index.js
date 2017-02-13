import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'

import App from './components/App'
import './index.css'

import BookStore from './stores/BookStore'
import CartStore from './stores/CartStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const bookStore = new BookStore(fetcher)
const cartStore = new CartStore(bookStore)

ReactDOM.render(
  <Provider bookStore={bookStore} cartStore={cartStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)

bookStore.loadBooks()