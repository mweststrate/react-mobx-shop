import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'

import BookStore from './stores/BookStore'
import CartStore from './stores/CartStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const bookStore = new BookStore(fetcher)
const cartStore = new CartStore(bookStore)

ReactDOM.render(
  <App bookStore={bookStore} cartStore={cartStore} />,
  document.getElementById('root')
)

bookStore.loadBooks()