import React, { useRef, useState } from "react";

import Input from "./Input";
import "./MealItemForm.css";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [amountValid, setAmountValid] = useState(true);

  const submitHandler = (event) => {
    // this is for the from submission
    event.preventDefault();
    const var1 = inputRef.current.value; // this is a string value , lets convert it
    const enteredAmount = +var1;

    //Step 2. lets do the validation
    if (var1.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setAmountValid(false);
      return; //will not continue stop the excustion cause its empty
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <Input
          ref={inputRef}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />

        <button type="submit">+Add</button>
        {!amountValid && <p>Please Enter A Value from 1-5</p>}
      </form>
    </div>
  );
};

export default MealItemForm;
