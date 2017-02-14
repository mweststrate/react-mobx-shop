import * as fs from "fs"
import {when} from "mobx"
import BookStore from './BookStore'

const bookFetcher = () => Promise.resolve(JSON.parse(fs.readFileSync("./public/books.json")))

it('bookstore fetches data', (done) => {
  const store = new BookStore(bookFetcher)
  store.loadBooks()
  when(
    () => store.isLoading === false,
    () => {
      expect(store.books.size).toBe(4)
      expect(store.books.get("978-1933988177").price).toBe(30.50)
      done()
    }
  )
})

it('bookstore sorts data', (done) => {
  const store = new BookStore(bookFetcher)
  store.loadBooks()
  when(
    () => store.isLoading === false,
    () => {
      expect(store.sortedAvailableBooks.map(book => book.name)).toEqual([
        "Lucene in Action, Second Edition",
        "Sophie\'s World : The Greek Philosophers",
        "The Lightning Thief",
        "The Sea of Monsters"
      ])
      done()
    }
  )
})
