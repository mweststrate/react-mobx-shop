import React, { Component } from 'react'
import logo from '../logo.svg'
import './App.css'

import Books from "./Books"
import BookDetails from "./BookDetails"
import Cart from "./Cart"

class App extends Component {
  constructor(p, x) {
    super(p, x)
    this.state = {
      page: "books",
      selectedBook: null
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMenu>
          <AppMenuItem onClick={this.openBooksPage}>Available books</AppMenuItem>
          <AppMenuItem onClick={this.openCartPage}>Your cart</AppMenuItem>
        </AppMenu>
        {this.renderPage()}
      </div>
    )
  }

  renderPage() {
    switch(this.state.page) {
      case "books":
        return <Books bookStore={this.props.bookStore} openBookPage={this.openBookPage} />
      case "book":
        return <BookDetails book={this.state.selectedBook} cartStore={this.props.cartStore} />
      case "cart":
        return <Cart cartStore={this.props.cartStore} />
      default:
        return "Sry, not found"
    }
  }

  openBooksPage = () => {
    this.setState({
      page: "books",
      selectedBook: null
    })
  }

  openBookPage = (book) => {
    this.setState({
      page: "book",
      selectedBook: book
    })
  }

  openCartPage = () => {
    this.setState({
      page: "cart",
      selectedBook: null
    })
  }
}

const AppHeader = () => (
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to the React MobX Book shop!</h2>
  </div>
)

const AppMenu = ({children}) => (
  <ul className="App-menu">
    {children}
  </ul>
)

const AppMenuItem = ({onClick, children}) => (
    <li>
      <a onClick={onClick}>{children}</a>
    </li>
)

export default App
