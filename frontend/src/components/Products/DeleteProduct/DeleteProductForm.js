import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function DeleteProductForm({ onClose }) {

    const dispatch = useDispatch();
    const history = useHistory();



    return (
        <>
        <div className="dlt-confirmation">
      <h1>Are you sure?</h1>
        <p>Are you sure you want to delete {product.title}? This action cannot be undone.</p>
        <div className="dlt-btn-container">
          <button className="cncl-btn" onClick={handleCancel}>Cancel</button>
          <button className="dlt-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </>
    )
};

export default DeleteProductForm;
