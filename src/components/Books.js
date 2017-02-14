import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

const Books = inject("bookStore")(observer(({bookStore, openBookPage}) => (
  <section className="Page-books">
    <h1>Available books</h1>
    {bookStore.isLoading && "Loading..."}
    {!bookStore.isLoading &&
      <ol>
        {bookStore.sortedAvailableBooks.map(book =>
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
    <Link to={`/book/${book.id}`}>{book.name}</Link>
  </li>
))

export default Books