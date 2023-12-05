import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  deleteProductCartThunk,
  editProductCartThunk,
  loadUserProductCartThunk,
} from "../../store/productcart";
import { loadUserCartThunk } from "../../store/cart";

import { csrfFetch } from "../../store/csrf";
import { addStripeSessionThunk } from "../../store/stripesession";
import { loadAllProductsThunk } from "../../store/product";
import { loadAllProductImagesThunk } from "../../store/productimage";

function CartPage2() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(loadUserProductCartThunk());
        await dispatch(loadUserCartThunk());
        await dispatch(loadAllProductsThunk());
        await dispatch(loadAllProductImagesThunk());

        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const cartItemsObj = useSelector((state) => state.productCart);
  const cartItems = Object.values(cartItemsObj);
  const allProductObj = useSelector((state) => state.product);
  const allProducts = Object.values(allProductObj);

  const imagesObj = useSelector((state) => state.productImage);
  const images = Object.values(imagesObj);
  const placeholderImageUrl = "https://via.placeholder.com/150"; // Replace this with your placeholder image URL
  const getImageUrl = (productId) => {
    const image = images.find((img) => img?.productId === productId);
    return image ? image.image : placeholderImageUrl;
  };

  


  const checkout = async (e) => {
    try {
      // Create a Stripe session
      const sessionResponse = await csrfFetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!sessionResponse.ok) {
        history.push("/");
        return;
      }

      const sessionData = await sessionResponse.json();

      const newStripeSession = {
        userId: user.id,
        sessionId: sessionData.data.id,
        cartId: cart[0].id,
      };

      await dispatch(addStripeSessionThunk(newStripeSession));

      // Redirect the user to the Stripe checkout page
      window.location.href = sessionData.data.url;
    } catch (error) {
      // Handle any other errors that may occur
      history.push("/");
    }
  };

  const addQuantity = (cartItem) => {
    dispatch(editProductCartThunk(cartItem.id, cartItem.productQuantity + 1));
  };

  const subtractQuantity = (cartItem) => {
    if (cartItem.productQuantity > 1) {
      dispatch(editProductCartThunk(cartItem.id, cartItem.productQuantity - 1));
    }
  };

  const deleteCartItem = (cartItem) => {
    dispatch(deleteProductCartThunk(cartItem.id));
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
      return total + cartItem.productQuantity * (cartItem.pricePerUnit / 100);
    }, 0);
  
    // Convert the total price to a string with 2 decimal places
    const formattedTotalPrice = totalPrice.toFixed(2);
  
    // Convert the string back to a number
    return parseFloat(formattedTotalPrice);
  };

  const getProductNameById = (productId, productData) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.productName : "Unknown Product";
  };

  const updateQuantity = (cartItem, newQuantity) => {
    // Ensure the new quantity is a positive integer
    newQuantity = parseInt(newQuantity, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(editProductCartThunk(cartItem.id, newQuantity));
    }
  };

  return isLoaded ? (
    <>
      <div className="shopping-cart-container">
        <div className="shopping-cart left">
          <h1>Shopping Cart</h1>
          <div>
            {cartItems.map((cartItem) => (
              <div className="cart-card" key={cartItem.id}>
                <div className="cart-info" id="cart-section">
                  <section className="table-cell" id="cart-name">
                    <NavLink to={`/products/${cartItem.productId}`}>
                      <img src={getImageUrl(cartItem.productId)} className="product-image" />
                      {getProductNameById(cartItem.productId, allProducts)}
                    </NavLink>
                  </section>
                  <section className="table-cell">
                    ${cartItem.pricePerUnit / 100}
                  </section>
                  <section className="table-cell" id="cart-quantity">
                    <aside
                      className="pointer quantity-change"
                      onClick={() => addQuantity(cartItem)}
                    >
                      <i className="bx bx-plus"></i>
                    </aside>
                    <input
                      type="number"
                      min="1"
                      value={cartItem.productQuantity}
                      onChange={(e) => updateQuantity(cartItem, e.target.value)}
                    />
                    <aside
                      className="pointer quantity-change"
                      onClick={() => subtractQuantity(cartItem)}
                    >
                      <i className="bx bx-minus"></i>
                    </aside>
                  </section>
                  <section>
                    ${(cartItem.productQuantity * cartItem.pricePerUnit) / 100}
                  </section>
                  <section className="table-cell">
                    <i
                      className="bx bxs-trash pointer"
                      onClick={() => deleteCartItem(cartItem)}
                    ></i>
                  </section>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="shopping-cart right">
          <h1>Checkout</h1>
          <div id="total-price">Total Price: ${calculateTotalPrice()}</div>
          <button onClick={checkout} id="checkout-button">
            Purchase
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default CartPage2;
