import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'

import BookStore from './stores/BookStore'

const fetcher = url => window.fetch(url).then(response => response.json())
const bookStore = new BookStore(fetcher)

ReactDOM.render(
  <App bookStore={bookStore} />,
  document.getElementById('root')
)

bookStore.loadBooks()