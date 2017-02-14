import BookStore from './BookStore'
import CartStore from './CartStore'
import ViewStore from './ViewStore'

export default class ShopStore {
  fetch
  bookStore
  cartStore
  viewStore

  constructor(fetcher) {
    this.fetch = fetcher
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
