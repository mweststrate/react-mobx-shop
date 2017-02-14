import React from 'react'
import { inject, observer } from 'mobx-react'

const BookDetails = inject("cartStore")(observer(({book, cartStore}) => (
  book
  ? <section className="Page-book">
      <h2>{book.name}</h2>
      <p><i>By: {book.author}</i></p>
      <p>Price: ${book.price}€</p>
      <button
        onClick={() => {
          cartStore.addBook(book)
          alert("Added to cart")
        }}
      >
        Add to cart
      </button>
    </section>
  : <h2>Book not found</h2>
)))

export default BookDetails
