import React from 'react'

const CartContext = React.createContext({
    items : [], //takes the cart items
    totalAmount: 0, // will give the total amount after adding the items
    addItem:  (item) => {} , //function to update the items
    removeItem: (id) => {}, // function to identify the item which should be removed from the cart.
    clearCart: () => {} // this will be clearing the cart once submitted
});

export default CartContext; // this will be used with useReducer to add some functionality to our code

