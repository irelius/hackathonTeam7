import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditProductForm from "./EditProductForm";

function EditProduct() {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <>
        <button className="" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-pen"></i> Edit
        </button>
        {showModal && (
          <Modal onClose={closeModal}>
            <EditProductForm onClose={closeModal}/>
          </Modal>
        )}
      </>
    );
  }

export default EditProduct;
