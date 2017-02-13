import {observable, computed, action} from "mobx"

class Book {
    @observable id
    @observable name
    @observable author
    @observable price

    constructor({id, name, author, price}) {
        this.id = id
        this.name = name
        this.author = author
        this.price = price
    }
}

export default class BookStore {
    @observable isLoading = false
    books = observable.map()

    constructor(fetch) {
        this.fetch = fetch
    }

    @computed get sortedBooks() {
        const books = this.books.values()
        return books.sort((a, b) =>
            a.name > b.name
                ? 1
                : a.name === b.name
                    ? 0
                    : -1
        )
    }

    @action loadBooks() {
        this.isLoading = true
        this.fetch("books.json")
            .then(json => {
                this.updateBooks(json)
                this.isLoading = false
            })
            .catch(err => {
                console.error("Failed to load books ", err)
            })
    }

    @action updateBooks(json) {
        this.books.clear()
        json.forEach(bookJson => {
            this.books.set(bookJson.id, new Book(bookJson))
        })
    }
}
