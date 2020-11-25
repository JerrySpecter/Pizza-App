import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Focusable } from "react-js-spatial-navigation";

const Item = (props) => {
  const { item, restaurant, addToCart, cart, removeById } = props;

  const handleAddToCart = () => {
    addToCart(item, restaurant);
  };

  const handleRemoveFromCart = (id) => {
    removeById(id);
  };

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cart.find((cartItem) => cartItem.id === item.id)) {
      setQuantity(cart.filter((cartItem) => cartItem.id === item.id).length);
    } else {
      setQuantity(0);
    }
  }, [cart]);

  if (!item) {
    return <h2>No menu items...</h2>;
  }

  return (
    <>
      <li className="menu-item">
        <div className="header">
          <div className="content-area">
            <img src={`img/pizzas/${item.image}`} className="" alt="Pizza"/>
            <div className="textual">
              <h2 className="title">
                {item.name} - {item.price}€
              </h2>
              <p className="description">{item.description}</p>
            </div>
          </div>
          <div className="action-area">
          <span className="quantity">
            {quantity > 0 && (

              (quantity+'x')

              )}
              </span>
            {quantity > 0 && (
              <Focusable onClickEnter={() => handleRemoveFromCart(item.id)}>
                <button
                  className="substract"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  -
                </button>
              </Focusable>
            )}
            <Focusable onClickEnter={handleAddToCart}>
              <button className="add-to-cart" onClick={() => handleAddToCart()}>
                Add+
              </button>
            </Focusable>
          </div>
        </div>
      </li>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (menuItem, restaurant) =>
      dispatch({ type: "ADD_TO_CART", payload: { menuItem, restaurant } }),
    removeById: (id) => dispatch({ type: "REMOVE_BY_ID", payload: { id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
