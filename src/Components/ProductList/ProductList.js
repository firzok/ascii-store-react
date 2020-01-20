import React, { useState, useEffect, useContext } from "react";
import "./ProductList.css";

import { Product, AdvertListItem } from "./Product/Product";
import { CartContext } from "../../App";

/**
 * This is the List view of the application
 */
export default function ProductList(props) {

  const [loadMore, setLoadMore] = useState(false);

  let { products, onFetchMore } = props;

  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    if (loadMore) {
      console.log("Window scrolled to the end.")

      onFetchMore();
    }

    setLoadMore(false);
  }, [loadMore])


  useEffect(() => {


    const list = document.getElementById('list')

    document.addEventListener('scroll', () => {
      debugger
      if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight) {
        debugger
        setLoadMore(true);
      }
    });

  }, []);

  function addToCart(product) {

    let currentCart = JSON.parse(cart) || [];

    let newProduct = product.id;

    let newCart = [];
    const index = currentCart.indexOf(newProduct);
    if (index < 0 || currentCart.length == 0) {
      newCart = [...currentCart, newProduct];
    }
    else {
      if (index > -1) {
        currentCart.splice(index, 1);
      }
      newCart = currentCart;
    }

    setCart(JSON.stringify(newCart));
  }



  return (
    <React.Fragment>
      {/* <span className="list-container__title">
        Viewing{" "}
        {products.length}{" "}
        faces
        </span> */}
      <div className="d-flex flex-wrap justify-content-center" id="list">
        {
          products.map((product, i) =>
            <Product
              key={i}
              id={product.id}
              size={product.size}
              price={product.price}
              face={product.face}
              date={product.date}
              onAddToCart={() => addToCart(product)}
            />
          )
        }
      </div>
      {/* {fetchingMore && (
          <span className="list-container__footer-text list-container__animated-loading">
            Loading...
          </span>
        )}
        {hasEndBeenReached && (
          <span className="list-container__footer-text">
            ~ end of catalogue ~
          </span>
        )} */}
    </React.Fragment>
  );

}
