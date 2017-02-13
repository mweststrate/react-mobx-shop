import React from 'react';

const BookDetails = ({book}) => (
  <section className="Page-book">
    <h2>{book.name}</h2>
    <p><i>By: {book.author}</i></p>
    <p>Price: ${book.price}€</p>
    <button>Add to cart</button>
  </section>
)

export default BookDetails;
