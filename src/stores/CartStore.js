import { when, reaction } from "mobx"
import { types, getParent, getSnapshot, applySnapshot } from "mobx-state-tree"
import { Book } from "./BookStore"

const CartEntry = types.model("CartEntry", {
        quantity: 0,
        book: types.reference(Book, "../../../bookStore/books"),
        get price() {
            return this.book.price * this.quantity
        },
        get isValidBook() {
            return this.book.isAvailable
        }
    }, {
        increaseQuantity(amount) {
            this.quantity += amount
        },
        updateQuantity(newAmount) {
            const amount  = parseInt(newAmount, 10)
            // eslint-disable-next-line
            this.quantity = amount !== amount ? 0 : amount
        }
})

export const CartStore = types.model("CartStore", {
        entries: types.optional(types.array(CartEntry), []),
        get shop() {
            return getParent(this)
        },
        get subTotal() {
            return this.entries.reduce((sum, e) => (sum + e.price), 0)
        },
        get hasDiscount() {
            return this.subTotal >= 100
        },
        get discount() {
            return this.subTotal * (this.hasDiscount ? 0.1 : 0)
        },
        get total() {
            return this.subTotal - this.discount
        },
        get canCheckout() {
            return this.entries.length > 0 && this.entries.every(entry => entry.quantity > 0 && entry.isValidBook)
        }
    }, {
        afterCreate() {
            if (typeof window.localStorage !== "undefined") {
                when(
                    () => !this.shop.isLoading,
                    () => {
                        this.readFromLocalStorage();
                        reaction(
                            () => getSnapshot(this),
                            json => {
                                window.localStorage.setItem('cart', JSON.stringify(json));
                            }
                        )
                    }
                )
            }
        },
        addBook(book, quantity = 1, notify = true) {
            let entry = this.entries.find(entry => entry.book === book)
            if (!entry) {
                this.entries.push({ book: book })
                entry = this.entries[this.entries.length - 1]
            }
            entry.increaseQuantity(quantity)
            if (notify)
                this.shop.alert("Added to cart")
        },
        checkout() {
            const total = this.total
            this.clear()
            this.shop.alert(`Bought books for ${total} € !`)
        },
        clear() {
            this.entries.clear()
        },
        readFromLocalStorage() {
            const cartData = window.localStorage.getItem('cart')
            if (cartData)
                applySnapshot(this, JSON.parse(cartData))
        }
})
