import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  deleteProductCartThunk,
  editProductCartThunk,
  loadUserProductCartThunk,
} from "../../store/productcart";
import { loadUserCartThunk } from "../../store/cart";

import { csrfFetch } from "../../store/csrf";
import { addStripeSessionThunk } from "../../store/stripesession";
import { loadAllProductsThunk } from "../../store/product";

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

  console.log(cartItems);

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
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.productQuantity * (cartItem.pricePerUnit / 100);
    }, 0);
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
                  <section className="table-cell">
                    <i
                      className="bx bxs-trash pointer"
                      onClick={() => deleteCartItem(cartItem)}
                    ></i>
                  </section>
                  <section className="table-cell" id="cart-name">
                    {allProducts[cartItem.id]?.productName}
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
                    <aside>{cartItem.productQuantity}</aside>
                    <aside
                      className="pointer quantity-change"
                      onClick={() => subtractQuantity(cartItem)}
                    >
                      <i className="bx bx-minus"></i>
                    </aside>
                  </section>
                  <section>
                  ${cartItem.productQuantity * cartItem.pricePerUnit / 100}
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
