import React from 'react'
import './Cart.css'

const Cart = () => (
  <section className="Page-cart">
    <h2>Your cart</h2>
    <section className="Page-cart-items">
      <div className="Page-cart-item">
        <p><a href="#">Sophie's World : The Greek Philosophers</a></p>
        <div className="Page-cart-item-details">
          <p>Amount: <input value="2" /> total: <b>20 €</b></p>
        </div>
      </div>
      <div className="Page-cart-item">
        <p><a href="#">Sophie's World : The Greek Philosophers</a></p>
        <div className="Page-cart-item-details">
          <p>Amount: <input value="2" /> total: <b>20 €</b></p>
        </div>
      </div>
    </section>
    <p>Subtotal: 120 €</p>
    <p><i>Large order discount: 12 €</i></p>
    <p><b>Total: 108 €</b></p>
    <button disabled="disabled">Submit order</button>
  </section>
)

export default Cart
