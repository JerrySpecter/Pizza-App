import React from "react";
import { connect, useSelector } from "react-redux";
import { data } from "./../../config";

const Confirmation = (props) => {
  const orderItems = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  if (!orderItems.length) {
    return <h2>No order yet..</h2>;
  }

  const restaurant = data.restaurants.find(
    (r) => r.id === orderItems[0].restaurant
  );

  return (
    <>
    <div className="container">
        <h2>Thanks for your order!</h2>
        <p>Your order will arive in - approximately <strong>42</strong> minutes.</p>
        <p>Your delivery details:</p>
        <ul>
          <li>{user.data.firstName}</li>
          <li>{user.data.name}</li>
          {/* <li>{user.data.phone}</li> */}
        </ul>
        <p>Restaurant details:</p>
        <ul>
          <li>{restaurant.name}</li>
          <li>{restaurant.phone}</li>
        </ul>
        <p>Your order:</p>
        <ul>
          {orderItems[0].cart.map((item, index) => {
            return (
              <li key={index}>
                <p>
                  {item.name} - {item.price}
                </p>
                {item.toppings && (
                  <ul>
                    {item.toppings.map((topping, index) => {
                      return <li key={index}>{topping.name}</li>;
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (menuItem) =>
      dispatch({ type: "ADD_TO_CART", payload: { menuItem } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
