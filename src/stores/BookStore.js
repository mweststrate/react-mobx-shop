import { observable, computed, action } from "mobx"
import { serializable, identifier, update, deserialize } from "serializr"

class Book {
    @serializable(identifier()) id
    @serializable @observable name
    @serializable @observable author
    @serializable @observable price
    @observable isAvailable = true
}

export default class BookStore {
    @observable isLoading = true
    books = observable.map()
    shop

    constructor(shop) {
        this.shop = shop
        setInterval(this.loadBooks, 5000)
    }

    @computed get sortedAvailableBooks() {
        return this.books.values()
            .filter(b => b.isAvailable)
            .sort((a, b) =>
                a.name > b.name
                    ? 1
                    : a.name === b.name
                        ? 0
                        : -1
            )
    }

    @action.bound loadBooks() {
        this.shop.fetch("/books.json")
            .then(json => {
                this.updateBooks(json)
                this.isLoading = false
            })
            .catch(err => {
                console.error("Failed to load books ", err)
            })
    }

    @action updateBooks(json) {
        this.books.values().forEach(book => book.isAvailable = false);
        json.forEach(bookJson => {
            if (this.books.has(bookJson.id)) {
                const book = this.books.get(bookJson.id);
                book.isAvailable = true;
                update(book, bookJson);
            } else {
                this.books.set(bookJson.id, deserialize(Book, bookJson))
            }
        });
    }
}
