import { observable, computed, action, reaction, when } from "mobx"

class CartEntry {
    @observable quantity = 0
    book

    constructor(book) {
        this.book = book
    }

    @computed get price() {
        return this.quantity * this.book.price
    }

    @computed get json() {
        return {
            book: this.book.id,
            quantity: this.quantity
        }
    }
}

export default class CartStore {
    bookStore
    @observable entries = []

    constructor(bookStore) {
        this.bookStore = bookStore

        if (typeof window.localStorage !== "undefined") {
            when(
                () => !bookStore.isLoading,
                () => {
                    this.readFromLocalStorage();
                    reaction(
                        () => this.json,
                        json => {
                            window.localStorage.setItem('cart', JSON.stringify(json));
                        }
                    )
                }
            )
        }
    }

    @computed get subTotal() {
        return this.entries.reduce((sum, e) => (sum + e.price), 0)
    }

    @computed get hasDiscount() {
        return this.subTotal >= 100
    }

    @computed get discount() {
        return this.subTotal * (this.hasDiscount ? 0.1 : 0)
    }

    @computed get total() {
        return this.subTotal - this.discount
    }

    @computed get canCheckout() {
        return this.entries.length > 0 && this.entries.every(entry => entry.quantity > 0)
    }

    @computed get json() {
        return this.entries.map(entry => entry.json)
    }

    @action addBook(book, quantity = 1) {
        let entry = this.entries.find(entry => entry.book === book)
        if (!entry) {
            entry = new CartEntry(book)
            this.entries.push(entry)
        }
        entry.quantity += quantity
    }

    @action clear() {
        this.entries.clear()
    }

    @action readFromLocalStorage() {
        const data = JSON.parse(window.localStorage.getItem('cart') || '[]')
        data.forEach(json => {
            this.addBook(this.bookStore.books.get(json.book), json.quantity)
        });
    }
}
