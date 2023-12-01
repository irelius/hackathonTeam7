import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductImageThunk } from "../../../store/productimage";
import { addProductThunk, editProductThunk } from "../../../store/product";

function AddProductForm({ setShowModal }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  //   const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setErrors(["Please select an image"]);
      return;
    }

    try {
      // Create a new product
      const newProduct = {
        productName,
        productDescription,
        productPrice,
        productQuantity,
      };

      // Dispatch action to add the product and get the ID
      const createdProduct = await dispatch(addProductThunk(newProduct));

      // Upload image to AWS S3 with the newly created product ID
      await dispatch(addProductImageThunk(createdProduct.data.id, image));
      console.log("Product and image uploaded successfully!");
    } catch (error) {
      console.error("Error creating product or associating image:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <div>
        <h1>Product Form</h1>
        {errors.length > 0 &&
          errors.map((error) => <div key={error}>{error}</div>)}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label>Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Product Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Product Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          <div>
            <label>Product Image</label>
            <input type="file" onChange={updateFile} />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
