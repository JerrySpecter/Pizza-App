import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Item from "./item";
import { sum } from "./../../helpers";
import { Link, useHistory } from "react-router-dom";
import { Focusable } from "react-js-spatial-navigation";
import { data } from "./../../config";

const Checkout = (props) => {
  const cartItems = useSelector((state) => state.cart);
  const history = useHistory();
  const { confirmOrder } = props;
  const restaurant = useSelector((state) => state.restaurant);

  const handleClickEnter = (path) => {
    history.push(path);
  };
  

  const handleConfirmOrder = () => {
    fetch("http://10.0.0.15:3001/order-email", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: cartItems,
        user: data.user,
        restaurant: data.restaurants.find((r) => r.id === restaurant).name,
      }),
    }).then((response) => {
      if (response.status === 200) {
        history.push("/your-order");
        confirmOrder();
      } else {
        console.log(response);
      }
    });
  };



  if (!cartItems || cartItems.length <= 0) {
    return <div className="container"><h2>No Items in cart...</h2></div>;
  }

  return (
    <>
      <div className="container">
        <h1>Cart</h1>
      </div>
      <ul className="menu menu--cart">
        {cartItems.length > 0 &&
          cartItems.map((cartItem, index) => {
            return <Item item={cartItem} index={index} key={index} />;
          })}
      </ul>
      <div className="container">
      {cartItems.length > 0 && <h2>Total: {sum(cartItems, "price")} €</h2>}
      </div>
      {cartItems.length > 0 && (
        <Focusable onClickEnter={handleConfirmOrder}>
        <a className="button-link" href="#/checkout" onClick={handleConfirmOrder}>
          Confirm your order
        </a>
        </Focusable>        
      )}

    </>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (menuItem) =>
      dispatch({ type: "ADD_TO_CART", payload: { menuItem } }),
    confirmOrder: () => dispatch({ type: "CONFIRM_ORDER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
