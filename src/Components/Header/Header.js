import React from "react";
import "./index.css";

import SortOptions from "./SortOptions";

/**
 * This is the header of the application with the cart count 
 */
export default function Header(props) {

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

          <div className="d-flex justify-content-center align-items-center main-header__cart-count">
            {1}
          </div>
          <i class="fas fa-shopping-cart"></i>
        </div>
      </div>
      <SortOptions onSetActiveFilter={sortOption => props.onSelectSort(sortOption)} />
    </div>
  );
}