import BookStore from './BookStore'
import CartStore from './CartStore'
import ViewStore from './ViewStore'

export default class ShopStore {
  fetch
  bookStore
  cartStore
  viewStore

  constructor(fetcher, alert = windowAlert) {
    this.fetch = fetcher
    this.alert = alert
    this.bookStore = new BookStore(this)
    this.cart = new CartStore(this)
    this.view = new ViewStore(this)
    this.bookStore.loadBooks()
  }

  get isLoading() {
    return this.bookStore.isLoading
  }

  get books() {
    return this.bookStore.books
  }

  get sortedAvailableBooks() {
    return this.bookStore.sortedAvailableBooks
  }
}

function windowAlert(msg) {
  window.alert(msg)
}
