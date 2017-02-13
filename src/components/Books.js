import React from 'react'
import { observer, inject } from 'mobx-react'

const Books = inject("bookStore")(observer(({bookStore, openBookPage}) => (
  <section className="Page-books">
    <h1>Available books</h1>
    {bookStore.isLoading && "Loading..."}
    {!bookStore.isLoading &&
      <ol>
        {bookStore.sortedBooks.map(book =>
          <BookEntry
            key={book.id}
            book={book}
            onClickEntry={openBookPage}
          />
        )}
      </ol>
    }
  </section>
)))

const BookEntry = observer(({onClickEntry, book}) => (
  <li>
    <a onClick={() => onClickEntry(book)}>{book.name}</a>
  </li>
))

export default Books