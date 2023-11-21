
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import addressReducer from "./address";
import productReducer from "./product";
import productCategoryReducer from "./productcategory";
import orderReducer from "./order";
import reviewReducer from "./review";
import discountReducer from "./discount";
import productCartReducer from "./productcart"
import cartReducer from "./cart";
import stripeSessionReducer from "./stripesession";
import userReducer from "./user";
import discountCategoryReducer from "./discountcategory";

const rootReducer = combineReducers({
  session: sessionReducer,
  product: productReducer,
  productCategory: productCategoryReducer,
  order: orderReducer,
  review: reviewReducer,
  address: addressReducer,
  discount: discountReducer,
  discountCategory: discountCategoryReducer,
  productCart: productCartReducer,
  cart: cartReducer,
  stripeSession: stripeSessionReducer,
  user: userReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
