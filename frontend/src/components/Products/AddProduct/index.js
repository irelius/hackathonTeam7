import { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddProductForm from "./AddProductForm";

function AddProduct() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="user-btn" onClick={() => setShowModal(true)}>
        Add new product
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddProductForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
export default AddProduct;
