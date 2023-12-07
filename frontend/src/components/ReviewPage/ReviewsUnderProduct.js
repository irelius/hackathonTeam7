import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditReview from "./EditReview";
import DeleteReviewModal from "./DeleteReview";

function ReviewsUnderProduct({ product, reviews }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const usersObj = useSelector((state) => state.user);
  const users = Object.values(usersObj);

  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleEditClick = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Render a full star
        stars.push(<i key={i} className="bx bxs-star"></i>);
      } else {
        // Render an empty star
        // stars.push(<i key={i} className="bx bx-star"></i>);
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
            <div className="review-info-user">
              <li className="info user">
                {users.find((user) => user.id === review.userId)?.username}
              </li>
              <li>{renderStars(review.rating)}</li>
            </div>
            <div className="review-info-date">
              <li>{formatDate(review.createdAt)}</li>
            </div>
            <div>
              <li className="review-info-review">{review.review}</li>
            </div>
            <div>
              {review.userId === sessionUser?.id && (
                <div>
                  <button onClick={() => handleEditClick(review.id)}>
                  <i class='bx bx-edit-alt' ></i>
                  </button>
                  <DeleteReviewModal
                    review={review}
                    // onCancel={() => setEditingReviewId(null)}
                  />
                </div>
              )}
            </div>
            {editingReviewId === review.id && (
              <EditReview
                review={review}
                product={product}
                onCancel={() => setEditingReviewId(null)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ReviewsUnderProduct;
