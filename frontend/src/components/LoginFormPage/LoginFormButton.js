import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginFormPage from ".";

function LoginFormButton() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="edit-comment-button"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          < LoginFormPage onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormButton;
