import React, { useState } from "react";
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

  var adID = Math.floor(Math.random() * 1000);

  function getRandomAdID() {

    var newAdID = Math.floor(Math.random() * 1000);

    while (newAdID === adID) {
      newAdID = Math.floor(Math.random() * 1000);
    }

    return newAdID

    // < p > Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

    //   < p > But first, a word from our sponsors:</p > <script>document.write('<img class="ad" src="/ads/?r=' + Math.floor(Math.random()*1000) + '" />');</script>
    //   </header >

  }


  /**
   * This function sorts the data
   * It also resets the page number and sort paramater after a filter has been selected
   * @param {number} newSort
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

        let newAd = {
          isAd: true,
          adID: getRandomAdID()
        }
        let newData = [...res.data, newAd]

        if (res.status === 200) {
          setData(newData);
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
    if (!endReached && !isGettingData) {
      let header = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      axios.get(`${PRODUCTS_URL}?_page=${page + 2}&_limit=${20}&_sort=${sort}`, { "headers": header }).then(res => {
        if (res.status === 200) {
          var total = res.data.length;

          let newAd = {
            isAd: true,
            adID: getRandomAdID()
          }

          let newData = [...res.data, newAd]

          if (total === 0) {
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
  function getProducts() {
    if (!endReached && !isGettingData) {

      if (futureData.length === 0) {
        setIsGettingData(true);
        let header = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        axios.get(`${PRODUCTS_URL}?_page=${page + 1}&_limit=${20}&_sort=${sort}`, { "headers": header }).then(res => {
          if (res.status === 200) {

            var total = res.data.length;
            let newAd = {
              isAd: true,
              adID: getRandomAdID()
            }

            let newData = [...res.data, newAd]

            if (total === 0) {
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
        <ProductList products={data} onFetchMore={getProducts} />

        <BounceLoader
          css={override}
          size={50}
          color={"rgb(246,113,51)"}
          loading={isGettingData}
        />
        {endReached ? <span style={{ alignSelf: "center" }}>~ end of catalogue ~</span> : ""}
      </div>
    </div >
  );

}
