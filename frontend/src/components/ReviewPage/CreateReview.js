import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addReviewThunk } from "../../store/review";

function CreateReview() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const { id } = useParams();

  const [productId, setProductId] = useState();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newReview = {
      userId: userId,
      productId: productId,
      review,
      rating,
    };

    dispatch(addReviewThunk(newReview));
  };

  return (
    <>
      <div>
        <form 
        onSubmit={handleSubmit}
        >
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type="textarea"
            placeholder="What did you like or dislike?"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </form>
      </div>
    </>
  );
}

export default CreateReview;
