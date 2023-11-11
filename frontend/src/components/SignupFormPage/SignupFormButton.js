import { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";

function SignupFormButton() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="btn" onClick={() => setShowModal(true)}>
        Log in
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <SignupFormPage onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormButton;
