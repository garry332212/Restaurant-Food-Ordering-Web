import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const lengthOfInput = (value) =>
  value.trim().length > 4 || value.trim().length < 4;

const Checkout = (props) => {
  const [fromInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const formInputs = {
      name: nameRef.current.value,
      street: streetRef.current.value,
      postal: postalRef.current.value,
      city: cityRef.current.value,
    };

    const isValid = {
      nameIsValid: !isEmpty(formInputs.name),
      streetIsValid: !isEmpty(formInputs.street),
      cityIsValid: !isEmpty(formInputs.city),
      postalIsValid: !lengthOfInput(formInputs.postal),
    };

    setFormInputsValid({
      name: isValid.nameIsValid,
      street: isValid.streetIsValid,
      city: isValid.cityIsValid,
      postal: isValid.postalIsValid,
    });
    const formIsValid =
      isValid.nameIsValid &&
      isValid.streetIsValid &&
      isValid.postalIsValid &&
      isValid.cityIsValid;

    if (formIsValid) {
      props.onConfrim({
        name: formInputs.name,
        street: formInputs.street,
        postal: formInputs.postal,
        city: formInputs.city,
      });
   
  };
  const inavlid = {
    nameError: `${classes.control} ${
      fromInputsValid.name ? " " : classes.invalid
    }`,
    streetError: `${classes.control} ${
      fromInputsValid.street ? " " : classes.invalid
    }`,
    postalError: `${classes.control} ${
      fromInputsValid.postal ? " " : classes.invalid
    }`,
    cityError: `${classes.control} ${
      fromInputsValid.city ? " " : classes.invalid
    }`,
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={inavlid.nameError}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!fromInputsValid.name && <p>Please Enter A Name For The Order!</p>}
      </div>
      <div className={inavlid.streetError}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!fromInputsValid.street && <p>Please Enter a Your Street Name!</p>}
      </div>
      <div className={inavlid.postalError}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!fromInputsValid.postal && <p>Please Enter a Valid Postal Code</p>}
      </div>
      <div className={inavlid.cityError}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!fromInputsValid.city && <p>Please Enter Your City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
