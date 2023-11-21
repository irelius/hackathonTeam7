import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadOneProductThunk } from "../../store/product";
import * as cartActions from "../../store/productcart";


function SingleProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.product);

  const placeholderImageUrl = "https://via.placeholder.com/750"; // Replace this with your placeholder image URL
  const productImage = product.imageUrl || placeholderImageUrl;

  const addToCart = () => {
    dispatch(cartActions.addProductCartThunk(product.id));
  };

  useEffect(() => {
    dispatch(loadOneProductThunk(id));
  }, [dispatch]);

  return (
    <>
      <div className="product-container">
        <div className="product left">
          <img
            src={productImage}
            alt={product.productName}
            className="product-image"
          />
        </div>
        <div className="product right">
          <h1>{product.productName}</h1>
          <h3>${product.productPrice}</h3>
          <p>{product.productDescription}</p>
          <button onClick={addToCart} className="add-cart-btn">Add to cart</button>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
