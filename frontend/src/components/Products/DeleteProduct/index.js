import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteProductForm from "./DeleteProductForm";


function DeleteProduct() {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
      setShowModal(false);
    };
  
    return (
      <>
        <button className="" onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-trash-can"></i> Delete
        </button>
        {showModal && (
          <Modal onClose={closeModal}>
            <DeleteProductForm onClose={closeModal}/>
          </Modal>
        )}
      </>
    );
  }

export default DeleteProduct;
