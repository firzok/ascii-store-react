import React, { useState, useEffect } from "react";
import "./ProductList.css";

import { Product, AdvertListItem } from "./Product/Product";

/**
 * This is the List view of the application
 */
export default function ProductList(props) {

  useEffect(() => {
    console.log("props updated")
  }, [props.products])

  useEffect(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // props.onFetchMore();

      console.log("Window scrolled")
    }
  }, [])


  // let {
  //   products: { data, fetchingMore, hasEndBeenReached, advertTargetIndex }
  // } = this.props;

  let product = {
    id: 1234,
    size: 55,
    price: 13,
    face: "( ⚆ _ ⚆ )",
    date: "Sat Jan 04 2020 10:24:02 GMT+0500 (Pakistan Standard Time)"
  }

  return (
    <React.Fragment>
      {/* <span className="list-container__title">
          Viewing{" "}
          {data.length >= 21
            ? data.length - advertTargetIndex / 20 + 1
            : data.length}{" "}
          faces
        </span> */}
      <div className="d-flex flex-wrap">
        {/* {data.map((product, i) =>
            product.isAdvert ? (
              <AdvertListItem
                key={i}
                title={product.title}
                description={product.description}
                sponsorsText={product.sponsorsText}
                generatedImageRef={product.generatedImageRef}
              />
            ) : (
                <ListItem
                  key={i}
                  id={product.id}
                  size={product.size}
                  price={product.price}
                  face={product.face}
                  date={product.date}
                />
              )
          )} */}
        <Product
          id={product.id}
          size={product.size}
          price={product.price}
          face={product.face}
          date={product.date}
        />
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
