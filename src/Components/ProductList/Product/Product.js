import React from "react";
import "./Product.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


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


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
/**
 * This is the default Product component
 */

export function Product(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" style={{ fontSize: props.size }}>
          {props.face}
        </Typography>
      </CardContent>
      <CardActions className="d-flex justify-content-between align-items-center product-footer">
        <Typography variant="h6" component="h2">
          {"$" + props.price}
        </Typography>
        <Fab className="product-cart-fab" aria-label="add" style={{ position: 'relative' }}>
          <AddShoppingCartIcon />
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
