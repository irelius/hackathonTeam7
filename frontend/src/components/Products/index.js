import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllProductsThunk } from "../../store/product";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./ProductPage.css";

export default function ProductsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProductsThunk());
  }, [dispatch]);

  const productObj = useSelector((state) => state.product);
  const products = Object.values(productObj);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // Load more products when user is near the bottom of the page
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const displayedProducts = products.slice(
    0,
    (currentPage + 1) * productsPerPage
  );

  const placeholderImageUrl = "https://via.placeholder.com/450";
  const productImage = placeholderImageUrl;

  return (
    <>
      <div className="all-products-container">
        <h1>Products</h1>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div className="product-cell" key={product.id}>
              <div className="product">
                <NavLink to={`/products/${product.id}`}>
                  <img src={productImage} className="product-image" alt="" />
                  <li>{product.productName}</li>
                </NavLink>
                <div className="product-price">
                  <li>${product.productPrice}</li>
                </div>
              </div>
              {/* <button className="cart-icon">
                <i className="bx bx-cart"></i>
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
