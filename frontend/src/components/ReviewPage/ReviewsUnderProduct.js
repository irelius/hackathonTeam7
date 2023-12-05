import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductReviewsThunk } from "../../store/review";
import { loadAllUsersThunk } from "../../store/user";

function ReviewsUnderProduct({ product, reviews }) {
  const dispatch = useDispatch();
  const usersObj = useSelector((state) => state.user);
  const users = Object.values(usersObj);
  // const reviewsObj = useSelector((state) => state?.review);
  // const reviews = Object.values(reviewsObj)

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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <div>
        <h1>Reviews</h1>
        {reviews.map((review) => (
          <div className="review">
            <div>
              <li>{review.review}</li>
              <li>{formatDate(review.createdAt)}</li>
            </div>
            <div className="review-info-user">
              <li className="info user">
                {users.find((user) => user.id === review.userId)?.username}
              </li>
              <li>{renderStars(review.rating)}</li>
            </div>
            <div className="review-info-date">
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ReviewsUnderProduct;
