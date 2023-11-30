import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductImageThunk } from "../../../store/productimage";
import { addProductThunk } from "../../../store/product";

function AddProductForm({ setShowModal }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
//   const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let newErrors = [];

//     // let newImage = {
//       // productName,
//       // productDescription,
//       // productPrice,
//       // productQuantity,
//     //   images,
//     // };

//     if (image.length === 0) {
//         setErrors(["Please select at least one image"]);
//         return;
//     }

//     const newProduct = {
//         image,
//     };


//     dispatch(addProductImageThunk({ newProduct }));
//   };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      setErrors(["Please select an image"]);
      return;
    }

    dispatch(addProductImageThunk({ image }));
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    console.log('this is files in form', file)
    if (file) setImage(file);
  };

   // for multiple file upload
    //    const updateFiles = (e) => {
    //        const files = e.target.files;
    //        console.log('this is files in form', files)
    //     if (files.length > 0) {
    //         setImages(files);
    //     }
    // };

  return (
    <>
      <div>
        <h1>Image Upload Test</h1>
        {errors.length > 0 &&
          errors.map((error) => <div key={error}>{error}</div>)}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Image</label>
            <input type="file" onChange={updateFile} />
          </div>
          <button type="submit">Upload Image</button>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
