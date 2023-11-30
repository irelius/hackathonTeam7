import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductImageThunk } from "../../../store/productimage";
import { addProductThunk } from "../../../store/product";

function AddProductForm({ setShowModal }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];

    // let newImage = {
      // productName,
      // productDescription,
      // productPrice,
      // productQuantity,
    //   images,
    // };

    if (images.length === 0) {
        setErrors(["Please select at least one image"]);
        return;
    }

    const newProduct = {
        images,
    };


    dispatch(addProductImageThunk({ newProduct }));
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImages(file);
  };

   // for multiple file upload
   const updateFiles = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        setImages(files);
    }
};

  return (
    <>
      <div>
        <h1>Product Form</h1>
        {errors.length > 0 &&
          errors.map((error) => <div key={error}>{error}</div>)}
        <form onSubmit={handleSubmit}>


            <input type="file" onChange={updateFile}/>
            <button type="submit">Add photos</button>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
