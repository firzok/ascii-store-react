import React, { useContext } from "react";
import "./index.css";
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import SortOptions from "./SortOptions";
import { CartContext } from "../../App";

/**
 * This is the header of the application with the cart count 
 */
export default function Header(props) {

  const [cart, setCart] = useContext(CartContext);

  let shoppingCart = JSON.parse(cart);
  let shoppingCartCount = shoppingCart ? shoppingCart.length : 0;


  return (
    <div className={'row main-header-container'}>
      <div
        className={'d-flex main-header justify-content-between align-items-center'}
      >
        <div className="d-flex">
          <span className="main-header__title--name">ECOM</span>
          <span className="main-header__title--slug">&nbsp;Store</span>
        </div>
        <div className="main-header__cart">

          {shoppingCartCount > 0 ?
            <div className="d-flex justify-content-center align-items-center main-header__cart-count">
              {shoppingCartCount}
            </div>
            :
            ""}

          <ShoppingCartTwoToneIcon style={{ fontSize: "3rem" }} />
        </div>
      </div>
      <SortOptions onSetActiveFilter={sortOption => props.onSelectSort(sortOption)} />
    </div>
  );
}