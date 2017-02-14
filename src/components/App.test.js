import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'

import ShopStore from "../stores/ShopStore"

it('renders without crashing', () => {
  const shop = new ShopStore(() => Promise.resolve([]));

  const div = document.createElement('div')
  ReactDOM.render(
    <Provider shop={shop}>
      <App />
    </Provider>,
    div)
})
