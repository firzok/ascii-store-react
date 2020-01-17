import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./Container.css";
import Header from "../../Components/Header/Header";
import ProductList from "../../Components/ProductList/ProductList";
import { PRODUCTS_URL } from "../../config/rest_endpoints";

/**
 * @Component - Container is the main product listing page
 * This Component houses 2 states, i.e _page and _sort which keeps count of the page and sort respectively
 * These states were lifted here since they are ties to both the Header and the List components
 */
export default function Container(props) {

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [hasEndBeenReached, setHasEndBeenReached] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [isGettingData, setIsGettingData] = useState(false);

  const [data, setData] = useState({});
  const [totalRecords, setTotalRecords] = useState(0);


  useEffect(() => {

  }, totalRecords);

  // componentDidMount() {
  //   let { _sort } = this.state;
  // }

  // componentDidUpdate(prevProps) {
  //   let {
  //     products: { data: newData }
  //   } = this.props,
  //     {
  //       products: { data: prevData }
  //     } = prevProps;

  //   //This updates the page number if a fetch more query is successful i.e new data length > old data length
  //   if (newData.length > prevData.length && newData !== prevData.length) {
  //     this.setState({
  //       _page: this.state._page + 1
  //     });
  //   }
  // }

  /**
   * This function sorts the data
   * It also resets the page number and sort paramater after a filter has been selected
   * @param {number} sort
   */
  function sortProducts(sort) {

    setPage(1);
    setSort(sort);

    if (!hasEndBeenReached && !fetchingMore) {

      setIsGettingData(true);
      let header = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      axios.get(`${PRODUCTS_URL}?_page=${1}&_limit=${10}&_sort=${sort}`, { "headers": header }).then(res => {
        var { data, total } = res.data;

        setIsGettingData(false);

        setData(data);
        setTotalRecords(total);
      })
        .catch(error => {
          setIsGettingData(false);
        });

    }

  };

  /**
   * This function fetches more products when a user scrolls at the end of page.
   */
  function fetchMoreProducts() {

    if (!hasEndBeenReached && !fetchingMore) {

      setIsGettingData(true);
      let header = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      axios.get(`${PRODUCTS_URL}?_page=${0}&_limit=${10}&_sort=${sort}`, { "headers": header }).then(res => {
        var { data, total } = res.data;

        setIsGettingData(false);

        setData(data);
        setTotalRecords(total);
      })
        .catch(error => {
          setIsGettingData(false);
        });

    }
  };

  return (
    <div className="container-fluid">
      <Header onSelectSort={sortProducts} />
      <div className="d-flex flex-column list-container">
        <ProductList products onFetchMore={fetchMoreProducts} />
      </div>
    </div>
  );

}
