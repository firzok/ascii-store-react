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


// import { api } from "../../../Services/Endpoints";
// import { getDate } from "../../../utils";
// import { NotificationBanner } from "../../NotificationBanner";

/**
 * This function composes the NotificationBanner function
 * @param {enum : "addition" | "removal"} type
 */
// function showNotificationBanner(type) {
//   let title =
//     type === "addition" ? "Faces added to cart" : "Faces removed from cart",
//     banner = NotificationBanner({ title, type });

//   banner.show();
// }

/**
 * This is the AdvertListItem component
 * created as a stateful component because of the need to show information
 * for the download progress of the sponsor images
 */
// class AdvertListItem extends React.PureComponent {
//   state = {
//     loading: true,
//     error: null
//   };

//   static propTypes = {
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     sponsorsText: PropTypes.string.isRequired,
//     generatedImageRef: PropTypes.number.isRequired
//   };

//   render() {
//     return (
//       <div className="d-flex flex-column list-item advert-list-item">
//         <h1 className="list-item__advert-title">{this.props.title}</h1>
//         <p className="list-item__advert-description">
//           {this.props.description}
//         </p>
//         <p className="list-item__advert-description">
//           {this.props.sponsorsText}
//         </p>
//         {this.state.loading && (
//           <div
//             className="d-flex align-items-center justify-content-center"
//             style={{ height: 200 }}
//           >
//             <span className="list-item__animated-loading list-item__loading">
//               Loading...
//             </span>
//           </div>
//         )}
//         {this.state.error && (
//           <div
//             className="d-flex align-items-center justify-content-center"
//             style={{ height: 179 }}
//           >
//             <span className="list-item__loading">{this.state.error}</span>
//           </div>
//         )}
//         <img
//           alt="advert"
//           onLoadStart={() => this.setState({ loading: true, error: null })}
//           onLoad={() => this.setState({ loading: false, error: null })}
//           onError={() =>
//             this.setState({ loading: false, error: "FAILED TO LOAD" })
//           }
//           className="ad"
//         // src={`${api.imageBaseURL}${this.props.generatedImageRef}`}
//         />
//       </div>
//     );
//   }
// }

/**
 * This is the default Product component
 */
export function Product(props) {

  const [cart, setCart] = useContext(CartContext);

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

// const ListItem = props => (
//   <div className="d-flex flex-column list-item">
//     <div className="d-flex justify-content-between align-items-center">
//       <span className="list-item__title">{props.id}</span>
//       {/* {props.cart.indexOf(props.id) === -1 ? ( */}
//         <i
//           className="mdi mdi-plus-circle"
//           onClick={() => {
//             props.addToCart(props.id);
//             // showNotificationBanner("addition");
//           }}
//         />
//       {/* ) : (
//           <i
//             className="mdi mdi-minus-circle"
//             onClick={() => {
//               props.removeFromCart(props.id);
//               // showNotificationBanner("removal");
//             }}
//           />
//         )} */}
//     </div>
//     <span className="list-item__size">Available size ({props.size}px)</span>
//     <div
//       className="align-self-center list-item__faces"
//       style={{ fontSize: props.size }}
//     >
//       {props.face}
//     </div>
//     <span className="list-item__price">${(props.price / 100).toFixed(2)}</span>
//     {/* <span className="list-item__date">{getDate(props.date)}</span> */}
//   </div>
// );

// export { ListItem, AdvertListItem };
