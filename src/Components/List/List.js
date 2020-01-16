import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import { connect } from "react-redux";

import { ListItem, AdvertListItem } from "./ListItem/ListItem";

/**
 * This is the List view of the application
 */
class List extends React.PureComponent {
  static propTypes = {
    onFetchMore: PropTypes.func.isRequired
  };

  componentDidMount() {
    document.body.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.props.onFetchMore();
      }
    };
  }

  render() {
    // let {
    //   products: { data, fetchingMore, hasEndBeenReached, advertTargetIndex }
    // } = this.props;
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
}

export default List;
