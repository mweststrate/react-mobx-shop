import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { when } from 'mobx'
import { Link } from 'react-router-dom'

import logo from '../logo.svg'
import './App.css'

import Books from "./Books"
import BookDetails from "./BookDetails"
import Cart from "./Cart"

@inject("bookStore") @observer
class App extends Component {
  constructor(p, x) {
    super(p, x)
    this.state = {
      page: "books",
      selectedBook: null
    }
  }

  componentWillMount() {
    this.handleRoute(this.props.match)
  }

  componentWillReceiveProps(nextProps) {
    this.handleRoute(nextProps.match)
  }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMenu>
          <AppMenuItem link="/">Available books</AppMenuItem>
          <AppMenuItem link="/cart">Your cart</AppMenuItem>
        </AppMenu>
        {this.renderPage()}
      </div>
    )
  }

  renderPage() {
    switch(this.state.page) {
      case "books":
        return <Books openBookPage={this.openBookPage} />
      case "book":
        return <BookDetails book={this.state.selectedBook} />
      case "cart":
        return <Cart />
      default:
        return "Sry, not found"
    }
  }

  handleRoute(match) {
    if (!match)
      return
    switch (match.path) {
      case "/cart":
        this.openCartPage()
        break
      case "/book/:bookId":
        const bookStore = this.props.bookStore
        when(
          () => !bookStore.isLoading,
          () => {
            this.openBookPage(bookStore.books.get(match.params.bookId))
          }
        )
        break
      case "/":
        this.openBooksPage()
        break
      default:
        console.warn("No route!")
        break
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

const AppMenuItem = ({link, children}) => (
    <li>
      <Link to={link}>{children}</Link>
    </li>
)

export default App
