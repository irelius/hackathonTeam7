import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addReviewThunk } from "../../store/review";
import Ratings from "react-ratings-declarative";

function CreateReview({ product }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const [productId, setProductId] = useState();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleClearStars = () => {
    setRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newReview = {
      userId: sessionUser.id,
      productId: product.id,
      review,
      rating,
    };

    dispatch(addReviewThunk(newReview));

    setReview("");
    setRating(0);
  };

  return (
    <>
      <div className="review-form-container">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <textarea
            className="textarea review"
            type="textarea"
            placeholder="What did you like or dislike?"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
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
            <button type="button" onClick={handleClearStars}>
            Clear
          </button>
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateReview;
