import React from 'react'

const Books = ({openBookPage}) => (
  <section className="Page-books">
    <h1>Available books</h1>
    <ol>
      <BookEntry
        key="978-0641723445"
        book={{
          "id" : "978-0641723445",
          "name" : "The Lightning Thief",
          "author" : "Rick Riordan",
          "price" : 12.50
        }}
        onClickEntry={openBookPage}
      />
      <BookEntry
        key="978-1423103349"
        book={{
          "id" : "978-1423103349",
          "name" : "The Sea of Monsters",
          "author" : "Rick Riordan",
          "price" : 6.49
        }}
        onClickEntry={openBookPage}
      />
    </ol>
  </section>
)

const BookEntry = ({onClickEntry, book}) => (
  <li>
    <a onClick={() => onClickEntry(book)}>{book.name}</a>
  </li>
)

export default Books