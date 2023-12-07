import React from "react";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../../store/review";

function DeleteReview({ review, onClose }) {
  const dispatch = useDispatch();

  const handleConfirmDelete = async () => {
    try {
      // Dispatch the deleteReview action and wait for its completion
      const deletedReview = await dispatch(
        deleteReviewThunk(review.id)
      );

      // Check if the review was deleted successfully
      if (deletedReview) {
        // Handle success (e.g., show a success message)
        console.log("Review deleted successfully");
      } else {
        // Handle deletion failure (e.g., show an error message)
        console.error("Failed to delete the review");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    } finally {
      // Close the confirmation pop-up
      onClose();
    }
  };

  return (
    <>
      <div className="dlt-confirmation">
        <p>Are you sure you want to delete this review?</p>
        <div className="dlt-btn-container">
          <button className="cncl-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="dlt-btn" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteReview;
