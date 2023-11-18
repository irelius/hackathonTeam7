import { useDispatch, useSelector } from "react-redux";
// import Object from "../Object"
import { useEffect, useState } from "react";
import { loadAllProductsThunk } from "../../store/product";
import "./ProductPage.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProductsThunk());
  }, [dispatch]);

  const productObj = useSelector((state) => state.product);
  const products = Object.values(productObj);


  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 9;
  const totalPageCount = Math.ceil(products.length / productsPerPage);

  const showNextPage = () => {
    if (currentPage < totalPageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <>
      <div className="product-container">
        <h1>Products</h1>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div className="product-cell" key={product.id}>
              <div className="product">
                <NavLink to={`/products/${product.id}`}>
                  <li>{product.productName}</li>
                </NavLink>
                <div className="product-price">
                  <li>${product.productPrice}</li>
                </div>
              </div>
              <button className="cart-icon"><i className='bx bx-cart'></i></button>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            className="arrow left"
            onClick={showPrevPage}
            disabled={currentPage === 0}
          >
            <i className="bx bxs-chevron-left"></i>
            {/* Previous */}
          </button>
          <button
            className="arrow right"
            onClick={showNextPage}
            disabled={currentPage === totalPageCount - 1}
          >
            {/* Next */}
            <i className="bx bxs-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

