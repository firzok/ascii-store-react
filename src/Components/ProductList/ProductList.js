import React, { useState, useEffect, useContext } from "react";
import { Product, Ad } from "./Product/Product";
import { CartContext } from "../../App";

/**
 * This is the Product List view of the application
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
    document.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight) {
        setLoadMore(true);
      }
    });

  }, []);

  function addToCart(product) {

    let currentCart = JSON.parse(cart) || [];
    let newProduct = product.id;
    let newCart = [];
    const index = currentCart.indexOf(newProduct);

    if (index < 0 || currentCart.length === 0) {
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
      <div className="d-flex flex-wrap justify-content-center" id="list">
        {
          products.map((product, i) => {
            return product.isAd ?
              <Ad
                key={i}
                adID={product.adID}
              />
              :
              <Product
                key={i}
                id={product.id}
                size={product.size}
                price={product.price}
                face={product.face}
                date={product.date}
                onAddToCart={() => addToCart(product)}
              />
          }
          )
        }
      </div>
    </React.Fragment>
  );

}
