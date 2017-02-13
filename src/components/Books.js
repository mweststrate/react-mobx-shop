import React from 'react'
import { observer, inject } from 'mobx-react'

const Books = inject("bookStore")(observer(({bookStore}) => (
  <section className="Page-books">
    <h1>Available books</h1>
    <ol>
      {bookStore.sortedAvailableBooks.map(book =>
        <BookEntry
          key={book.id}
          book={book}
        />
      )}
    </ol>
  </section>
)))

const BookEntry = inject("viewStore")(observer(({book, viewStore}) => (
  <li>
    <a
      href={`/book/${book.id}`}
      onClick={(e) => {
        e.preventDefault();
        viewStore.openBookPage(book);
        return false;
      }}
    >{book.name}</a>
  </li>
)))

export default Books