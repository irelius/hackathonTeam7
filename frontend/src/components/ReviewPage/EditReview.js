import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../store/review";
import Ratings from "react-ratings-declarative";

function EditReview({ review: initialReview, onCancel, product }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [review, setReview] = useState(initialReview.review || "");
  const [rating, setRating] = useState(initialReview.rating || 0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSave = async (e) => {
    e.preventDefault();

    try {
      const editedReview = {
        userId: sessionUser.id,
        productId: product.id,
        review,
        rating,
      };
      await dispatch(editReviewThunk( initialReview.id, editedReview));
      onCancel();
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      <textarea type="text" 
      value={review}
      onChange={(e) => setReview(e.target.value)}
      />
      <div>
        <Ratings
          rating={rating}
          widgetRatedColors="#2C3E50"
          changeRating={handleStarClick}
        >
          <Ratings.Widget widgetHoverColor="#57687c" />
          <Ratings.Widget widgetHoverColor="#57687c" />
          <Ratings.Widget widgetHoverColor="#57687c" />
          <Ratings.Widget widgetHoverColor="#57687c" />
          <Ratings.Widget widgetHoverColor="#57687c" />
        </Ratings>
        {/* <button type="button" onClick={handleClearStars}>
            Clear
          </button> */}
      </div>
      <button onClick={handleReviewSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </>
  );
}

export default EditReview;
