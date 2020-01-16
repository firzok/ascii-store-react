import React, { useState, useEffect } from "react";
import "./index.css";

/**
 * This handles the sorting of the products
 */
export default function SortOptions(props) {

  const [filterBy, setFilterBy] = useState("NONE");

  function setActiveFilter(value) {
    setFilterBy(value)
  }

  useEffect(() => {
    props.onSetActiveFilter(filterBy.toLowerCase())
  }, [filterBy]);

  return (
    <div className="d-flex justify-content-center sort-header align-items-center">
      <span className="sort-header__title">Sort By:</span>
      <div
        className={`text-center sort-header__filter-item ${filterBy ===
          "ID" && "sort-header__filter-item--active"}`}
        onClick={() => setActiveFilter("ID")}
      >
        ID
        </div>
      <div
        className={`text-center sort-header__filter-item ${filterBy ===
          "SIZE" && "sort-header__filter-item--active"}`}
        onClick={() => setActiveFilter("SIZE")}
      >
        SIZE
        </div>
      <div
        className={`text-center sort-header__filter-item ${filterBy ===
          "PRICE" && "sort-header__filter-item--active"}`}
        onClick={() => setActiveFilter("PRICE")}
      >
        PRICE
        </div>
    </div>
  );

}
