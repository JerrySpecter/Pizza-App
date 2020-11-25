import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { Focusable, FocusableSection } from "react-js-spatial-navigation";
import { useSelector } from "react-redux";

export const Menu = (props) => {
  let match = useRouteMatch();
  const history = useHistory();

  const cartItems = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  const handleClickEnter = (path) => {
    history.push(path);
  };

  return (
    <FocusableSection defaultElement="first">
    <div className="navigation">
      <Focusable onClickEnter={() => handleClickEnter(`${match.url}`)} className="first">
        <Link
          className="navigation-link"
          className={`
            ${window.location.hash === "#/" ? "active" : ""} navigation-link
          `}
          to={`${match.url}`}
        >
          Restaurants
        </Link>
      </Focusable>
      <Focusable onClickEnter={() => handleClickEnter(`/reorder`)}>
        <Link
          className={`${
            window.location.hash === "#/reorder" ? "active" : ""
          } navigation-link`}
          to={`/reorder`}
        >
          Reorder
        </Link>
      </Focusable>
      <Focusable onClickEnter={() => handleClickEnter(`/cart`)}>
        <Link
          className={`${
            window.location.hash === "#/cart" ||
            window.location.hash === "#/checkout"
              ? "active"
              : ""
          } navigation-link`}
          to={`/cart`}
        >
          Cart {cartItems && cartItems.length > 0 && `(${cartItems.length})`}
        </Link>
      </Focusable>
      {order.length > 0 && (
        <Focusable onClickEnter={() => handleClickEnter(`/your-order`)}>
          <Link
            className={`${
              window.location.hash === "#/your-order" ? "active" : ""
            } navigation-link`}
            to={`/your-order`}
          >
            Your order
          </Link>
        </Focusable>
      )}
    </div>
    </FocusableSection>
  );
};
