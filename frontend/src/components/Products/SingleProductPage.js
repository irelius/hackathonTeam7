import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadOneProductThunk } from "../../store/product";
import * as cartActions from "../../store/productcart";
import { loadOneProductImageThunk } from "../../store/productimage";


function SingleProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.product);
    const imagesObj = useSelector((state) => state.productImage);
  const images = Object.values(imagesObj);


  const placeholderImageUrl = "https://via.placeholder.com/750"; // Replace this with your placeholder image URL
  const getImageUrl = (productId) => {
    const image = images.find((img) => img?.productId === productId);
    return image ? image.image : placeholderImageUrl;
  };

  const addToCart = () => {
    dispatch(cartActions.addProductCartThunk(product.id));
  };

  useEffect(() => {
    dispatch(loadOneProductThunk(id));
    dispatch(loadOneProductImageThunk(product.id));
  }, [dispatch]);

  return (
    <>
      <div className="product-container">
        <div className="product left">
          <img
            src={getImageUrl(product.id)} 
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
