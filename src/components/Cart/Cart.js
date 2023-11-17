import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import "./Cart.css";
import CartContext from "../ContextManagement/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setDidSubmitting] = useState(false);
  const [isChekOut, setIsCheckout] = useState(false)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; // displays the totaal amount
  const hasCartHasItems = cartCtx.items.length > 0; // only show Order button if cart contains items / if empty do not show Order

  //Remov Items From The Cart
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  //closeCart wen Cancel Form 
  const orderHandler = () =>{
    setIsCheckout(true)
  }

  //form submission with items along with userDetails
  const orderSubmit = async(userDetails) => {
    setIsSubmitting(true);
    await fetch("https://react-http-4dcfb-default-rtdb.firebaseio.com/orders.json", {
        method: 'POST',
        body: JSON.stringify({
          user: userDetails,
          orderedItems:cartCtx.items 
        })
      });
      setIsSubmitting(false)
      setDidSubmitting(true)
      cartCtx.clearCart();
  }

  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item, id) => (
        <CartItem
          key={item.id}
          name={item.name}
          pic={item.pic}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartButtons = ( <div className="actions">
  <button onClick={props.cartCloseBtn} className="button--alt">
    Close
  </button>
  {hasCartHasItems && <button className="button" onClick={orderHandler}>Order</button>}
</div>)

    const cartModal = (<>
      <div>{cartItems}</div>

      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
       {isChekOut && <Checkout onConfrim={orderSubmit} onCancel={props.cartCloseBtn}/>}
       {!isChekOut && cartButtons}
    
    </>)

    const isSubmittingModal = <p>Sending Your Order To The Store</p>
    const didSubmittingModal = (<><p>Your Order Has Been Placed !It Will Be Ready In 20 minutes</p>  
    <div className="actions">
    <button onClick={props.cartCloseBtn} className="button">
      Close
    </button>
    
  </div></>)
  return (
    <Modal cartCloseBtn={props.cartCloseBtn}>
     
     {!isSubmitting&& !didSubmitting && cartModal}
     {isSubmitting &&  isSubmittingModal}

     {!isSubmitting && didSubmitting && didSubmittingModal}
     
    </Modal>
  );
};

export default Cart;
