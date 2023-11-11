import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllReviewsThunk } from "../../store/review";
import "./ReviewPage.css";
import { loadAllProductsThunk } from "../../store/product";
import { loadAllUsersThunk } from "../../store/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ReviewPage() {
  const dispatch = useDispatch();
  const [transform, setTransform] = useState(0);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadAllReviewsThunk());
    dispatch(loadAllProductsThunk())
    dispatch(loadAllUsersThunk())
  }, [dispatch]);

  const reviewObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewObj);
  const productObj = useSelector((state) => state.product);
  const products = Object.values(productObj)
  const userObj = useSelector((state) => state.user);
  const users = Object.values(userObj)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Render a full star
        stars.push(<i key={i} className="bx bxs-star"></i>);
      } else {
        // Render an empty star
        stars.push(<i key={i} className="bx bx-star"></i>);
      }
    }
    return stars;
  };

  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 2;
  const totalPageCount = Math.ceil(reviews.length / reviewsPerPage);

  const showNextPage = () => {
    if (currentPage < totalPageCount - 1) {
      setCurrentPage(currentPage + 1);
      setTransform(transform - (45 / 100) * window.innerWidth + 6);
    }
  };

  const showPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setTransform(transform + (45 / 100) * window.innerWidth + 6);
    }
  };

  const displayedReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <>
      <div className="review-container">
      <div className="order-back-button" onClick={() => history.push('/')}>
        <i className='bx bx-x-circle'></i>
      </div>
        <h1>Reviews</h1>
        <div className="review-grid">
          {displayedReviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-info">
                <li className="info product">{products.find(product => product.id === review.productId)?.productName}</li>
                <li>{renderStars(review.rating)}</li>
              </div>
              <div className="review-info">
                <li>{review.review}</li>
              </div>
              <div className="review-info">
                <li className="info user">{users.find(user => user.id === review.userId)?.username}</li>
                <li> - {formatDate(review.createdAt)}</li>
              </div>
              {/* <hr></hr> */}
            </div>
          ))}
        </div>
        <div className="pagination">
          <button className="arrow left" onClick={showPrevPage} disabled={currentPage === 0}>
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

export default ReviewPage;
