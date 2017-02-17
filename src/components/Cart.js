import React from 'react'
import { observer, inject } from 'mobx-react'
import './Cart.css'

const Cart = inject("cartStore")(observer(({cartStore}) => (
  <section className="Page-cart">
    <h2>Your cart</h2>
    <section className="Page-cart-items">
      {cartStore.entries.map(entry =>
        <CartEntry key={entry.book.id} entry={entry} />
      )}
    </section>
    <p>Subtotal: {cartStore.subTotal} €</p>
    {cartStore.hasDiscount && <p><i>Large order discount: {cartStore.discount} €</i></p>}
    <p><b>Total: {cartStore.total} €</b></p>
    <button
      disabled={!cartStore.canCheckout}
      onClick={() => {
        const total = cartStore.total
        cartStore.clear()
        alert(`Bought books for ${total} € !`)
      }}
    >
      Submit order
    </button>
  </section>
)))

const CartEntry = observer(({entry}) => (
  <div className="Page-cart-item">
    <p><a href="#">{entry.book.name}</a></p>
    <div className="Page-cart-item-details">
      <p>Amount:
        <input value={entry.quantity} onChange={updateEntryQuantity.bind(entry)} />
        total: <b>{entry.price} €</b>
      </p>
    </div>
  </div>
))

function updateEntryQuantity(e) {
  this.quantity = parseInt(e.target.value, 10)
}

export default Cart
