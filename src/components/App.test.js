import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import BookStore from "../stores/BookStore"

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <App bookStore={new BookStore()} />,
    div
  )
})