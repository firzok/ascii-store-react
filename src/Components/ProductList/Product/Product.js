import React, { useContext } from "react";
import "./Product.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartTwoToneIcon from '@material-ui/icons/RemoveShoppingCartTwoTone';
import { CartContext } from "../../../App";
import getDate from "../../../utils/date"
import { ADS_URL } from "../../../config/rest_endpoints";
import CardMedia from '@material-ui/core/CardMedia';

/**
 * This is the Ad component
 */
export function Ad(props) {

  let imageURL = `${ADS_URL}?r=${props.adID}`;

  return (
    <Card className="product-card" variant="outlined">
      <CardContent className="product-card-face">
        <Typography variant="body2" color="textSecondary" component="p">
          Here you're sure to find a bargain on some of the finest ascii available to purchase.
          Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
          But first, a word from our sponsors.
        </Typography>

        <CardMedia
          className="ad-image"
          image={imageURL}
          title="Sponsored Content"
        />

      </CardContent>

    </Card>
  )
}

/**
 * This is the default Product component
 */
export function Product(props) {

  const [cart, _] = useContext(CartContext);

  const currentCart = JSON.parse(cart) || [];

  const productInCart = currentCart.indexOf(props.id) >= 0 ? true : false;

  return (
    <Card className="product-card" variant="outlined">
      <CardContent className="product-card-face">
        <Typography style={{ fontSize: props.size }}>
          {props.face}
        </Typography>

      </CardContent>

      <CardActions className="d-flex justify-content-between align-items-center product-footer">

        <div>
          <Typography variant="h6" component="h2">
            {"$" + props.price / 100}
          </Typography>
          <Typography>
            {getDate(props.date)}
          </Typography>
        </div>

        <Fab className="product-cart-fab" aria-label="add" style={{ position: 'relative' }} onClick={() => props.onAddToCart()}>
          {productInCart ? <RemoveShoppingCartTwoToneIcon /> : <AddShoppingCartIcon />}
        </Fab>

      </CardActions>
    </Card>
  )

};