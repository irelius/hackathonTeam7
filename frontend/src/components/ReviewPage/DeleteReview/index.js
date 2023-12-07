import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteReview from "./DeleteReview";

function DeleteReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
      >
        <i class='bx bx-trash'></i>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <DeleteReview review={review} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteReviewModal;
