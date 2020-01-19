import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./Container.css";
import Header from "../../Components/Header/Header";
import ProductList from "../../Components/ProductList/ProductList";
import { PRODUCTS_URL } from "../../config/rest_endpoints";
import { BounceLoader } from "react-spinners";


/**
 * @Component - Container is the main product listing page
 * This Component houses 2 states, i.e _page and _sort which keeps count of the page and sort respectively
 * These states were lifted here since they are ties to both the Header and the List components
 */
export default function Container(props) {

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("none");
  const [endReached, setEndReached] = useState(false);
  const [isGettingData, setIsGettingData] = useState(false);

  const [data, setData] = useState([]);
  const [futureData, setFutureData] = useState([]);


  // useEffect(() => {

  // }, totalRecords);

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


  // useEffect(() => {

  // }, sort);

  /**
   * This function sorts the data
   * It also resets the page number and sort paramater after a filter has been selected
   * @param {number} sort
   */
  function sortProducts(newSort) {
    setPage(1);
    setSort(newSort);
    setData([]);
    setFutureData([]);
    window.scrollTo(0, 0);

    if (!endReached && !isGettingData) {

      setIsGettingData(true);
      let header = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      axios.get(`${PRODUCTS_URL}?_page=${1}&_limit=${20}&_sort=${newSort}`, { "headers": header }).then(res => {

        if (res.status == 200) {
          setData(res.data);
        }
        setIsGettingData(false);
      })
        .catch(error => {
          setIsGettingData(false);
        });
    }

  };

  /**
   * This function fetches future products so that when a user scrolls at the end of page, next data is already loaded.
   */
  function getFutureData() {
    debugger;
    if (!endReached && !isGettingData) {
      let header = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      axios.get(`${PRODUCTS_URL}?_page=${page + 2}&_limit=${20}&_sort=${sort}`, { "headers": header }).then(res => {
        if (res.status == 200) {

          var total = res.data.length;
          var newData = res.data;

          if (total == 0) {
            setEndReached(true);
          }
          setFutureData(newData);
        }

      })
    }
  }

  /**
   * This function fetches more products when a user scrolls at the end of page.
   */
  function fetchMoreProducts() {
    debugger
    if (!endReached && !isGettingData) {

      if (futureData.length == 0) {
        setIsGettingData(true);
        let header = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        axios.get(`${PRODUCTS_URL}?_page=${page + 1}&_limit=${20}&_sort=${sort}`, { "headers": header }).then(res => {
          if (res.status == 200) {

            var total = res.data.length;
            var newData = res.data;

            if (total == 0) {
              setEndReached(true);
            }
            setData([...data, ...newData]);
          }
          setIsGettingData(false);

        })
          .catch(error => {
            setIsGettingData(false);
          });

        setPage(page + 1);
        getFutureData();
      }
      else {
        setData([...data, ...futureData]);

        setFutureData([]);
        getFutureData();
      }


    }
  };

  const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  return (
    <div className="container-fluid">
      <Header onSelectSort={sortProducts} />
      <div className="d-flex flex-column list-container">
        <ProductList products={data} onFetchMore={fetchMoreProducts} />

        <BounceLoader
          css={override}
          size={50}
          color={"rgb(246,113,51)"}
          loading={isGettingData}
        />
      </div>
    </div>
  );

}
