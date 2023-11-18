import { Gltf, PresentationControls, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../../../store/product";
import * as cartActions from "../../../store/productcart";
import "./index.css";
import { addReviewThunk } from "../../../store/review";

export default function ProductScene({ product }) {
  const dispatch = useDispatch();
  const loadedProduct = useSelector((state) => state.product);
  const [isReviewTextareaVisible, setIsReviewTextareaVisible] = useState(false);
  const location = window.location.pathname

  const toggleReviewTextarea = () => {
    setIsReviewTextareaVisible(!isReviewTextareaVisible);
  };

  useEffect(() => {
    dispatch(productActions.loadOneProductThunk(product.productName));
  }, [dispatch]);

  const addToCart = () => {
    dispatch(cartActions.addProductCartThunk(loadedProduct.id));
  };

  const sessionUser = useSelector((state) => state.session.user);


  const [productId, setProductId] = useState(loadedProduct.id);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newReview = {
      userId: sessionUser.id,
      productId,
      review,
      rating
    };

    dispatch(addReviewThunk(newReview));
  };

  // if (!sessionUser) {
  //   return <Redirect to="/login" />
  // }

  return (
    <group position={[15, 2.5, -8]}>
      <PresentationControls
        cursor={true}
        speed={5}
        polar={[0, 0]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
      >
        <Gltf
          src={product.src}
          position={[0, 0, 0]}
          rotation={[0, 5.7, 0]}
          // onLoad={(gltf) => handleModelLoad(gltf)}
        />
      </PresentationControls>
      {location !== '/cart' && <Html position={[13, 2.5, -8]} center>
        {loadedProduct && <div className='product-info'>
          <h1>{loadedProduct.productName}</h1>
          <div className="product-btn">
            <h3>$ {loadedProduct.productPrice / 100}</h3>
            <h3>Quantity: {loadedProduct.quantity}</h3>
          </div>
          <p>{loadedProduct.productDescription}</p>
          <div>
            <button onClick={addToCart} className="add-product-btn">
              Add to cart
            </button>
          </div>
          <div>
            <button
              onClick={toggleReviewTextarea}
              className="toggle-review-btn"
            >
              {isReviewTextareaVisible ? "Close Review" : "Write a Review"}
            </button>
            {isReviewTextareaVisible && (
              <form onSubmit={handleSubmit}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <textarea
                  className="review-textarea"
                  type="textarea"
                  placeholder="What did you like or dislike?"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                />
                <div>
                  <label>Rate the product (1-5 stars):</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="submit-review-btn">
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>}
      </Html>}
    </group>
  );
}
