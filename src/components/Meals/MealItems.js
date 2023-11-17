import React,{useContext} from "react";
import CartContext from "../ContextManagement/cart-context";
import MealItemForm from "../Form/MealItemForm";
import "./MealItem.css";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx =useContext(CartContext)

  const addToCartHandler =(amount) =>{
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      pic:props.pic,
      amount: amount,
      price: props.price,
    });
  }
  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <img src={props.pic} height={"50px"} alt="" />
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id}  onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
