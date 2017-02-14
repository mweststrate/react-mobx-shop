import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'

import App from './components/App'
import './index.css'

import BookStore from './stores/BookStore'
import CartStore from './stores/CartStore'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const fetcher = url => window.fetch(url).then(response => response.json())
const bookStore = new BookStore(fetcher)
const cartStore = new CartStore(bookStore)

ReactDOM.render(
  <Provider bookStore={bookStore} cartStore={cartStore}>
    <Router>
      <div>
        <Switch>
          <Route path="/cart" component={App} />
          <Route path="/book/:bookId" component={App} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)

bookStore.loadBooks()