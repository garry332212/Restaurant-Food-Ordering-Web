import React, { useContext, useEffect, useState } from "react";
import CartContext from "../ContextManagement/cart-context";

import styles from "./Header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Thali from "./thali.png";

const Header = (props) => {
  const [btnBump, setBtnBump] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  //to add number of cart items
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  //adding a bump animation to cart button
  const btnClass = `${styles.button} ${btnBump ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnBump(true);
    const bumpTimer = setTimeout(() => {
      setBtnBump(false);
    }, 500);

    return () => {
      clearTimeout(bumpTimer);
    };
  }, [items]);
  return (
    <>
      <header className={styles.header}>
        <h1>Food Mania</h1>

        <img src={Thali} alt="" />

        <div className={styles.header_right}>
          <button onClick={props.openCart} className={btnClass}>
            <span className={styles.icon}>
              <ShoppingCartIcon />
            </span>
            <span className={styles.badge}>{numberOfCartItems}</span>
          </button>
        </div>
      </header>

      {/* Adding Image Under The Header */}
      <div className={styles["main-image"]}>
        <img
          src="https://cdn.pixabay.com/photo/2014/04/05/11/27/buffet-315691_960_720.jpg"
          alt="coverImage"
        />
      </div>
    </>
  );
};

export default Header;
