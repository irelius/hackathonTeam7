import "./EditProduct.css"

import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react"

import * as productCategoryActions from "../../../../../store/productcategory"
import * as productActions from "../../../../../store/product"
import CategorySection from "../../../ReusableSections/CategorySection"

function EditProduct({ product, onCloseExpandRow, setProductUpdated }) {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(productCategoryActions.loadProductCategoryByProductThunk(product.id))
    }, [dispatch, product.id])

    const allProductCategories = useSelector(state => state.productCategory)

    const [name, setName] = useState(product.productName)
    const [price, setPrice] = useState(product.productPrice / 100)
    const [stock, setStock] = useState(product.productQuantity)
    const [description, setDescription] = useState(product.productDescription)

    const [currCats, setCurrCats] = useState({})
    const [copyCurrCats, setCopyCurrCats] = useState({})
    const [newCategories, setNewCategories] = useState({})

    // useEffect to set up the currCats useState variable. Object with categoryNames as key for O(1) lookup. requires some time to set up though
    useEffect(() => {
        const productCategories = {};
        let pcArr = Object.values(allProductCategories)
        for (let i = 0; i < pcArr.length; i++) {
            let curr = pcArr[i];
            if (curr && curr.Category) { // Check if curr and curr.Category are defined
                productCategories[curr.Category.categoryName] = true;
            }
        }

        setCurrCats(prevState => ({
            ...prevState,
            ...productCategories,
        }));
        setCopyCurrCats(prevState => ({
            ...prevState,
            ...currCats,
        }));
    }, [allProductCategories]);

    const handleCategorySelection = (updatedCategories) => {
        setNewCategories(updatedCategories)
    }

    const handleProductEdit = () => {
        // handle any edits made to product name, price, and quantity
        const newProductInfo = {
            productName: name.trim(),
            productPrice: price * 100,
            productDescription: description.trim(),
            productQuantity: stock,
        }
        dispatch(productActions.editProductThunk(product.id, newProductInfo))

        // handle any edits amde to the product categories
        dispatch(productCategoryActions.editProductCategoryThunk(product.id, Object.keys(newCategories)))

        setProductUpdated(prevState => !prevState)

        return onCloseExpandRow()
    }

    const handleCancel = () => {
        setCurrCats(() => ({
            ...copyCurrCats
        }))
        return onCloseExpandRow()
    }

    return (
        <form onSubmit={handleProductEdit} id="product-main-container" className="bg-200">
            <section id="product-link">
                View <p onClick={() => history.push(`/products/${product.id}`)} id="product-name" className="text-200">{product.productName}</p>
            </section>
            <section id="product-info-container">
                <aside id="product-edit-container">
                    <section>
                        <aside>Edit Name:</aside>
                        <input
                            type="text"
                            required
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside>Edit Price:</aside>
                        <input
                            type="number"
                            required
                            defaultValue={`${price}`}
                            onKeyDown={(e) => {
                                if (e.key === " ") {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </section>
                    <section>
                        <aside>Edit Stock:</aside>
                        <input
                            type="number"
                            required
                            defaultValue={stock}
                            onKeyDown={(e) => {
                                if (e.key === " ") {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </section>
                </aside>
                <aside>
                    <aside id='product-description'>Edit Description</aside>
                    <textarea
                        id="product-description-input"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </aside>
            </section>

            <section>
                <CategorySection onCategoryChange={handleCategorySelection} currCats={currCats} setCurrCats={setCurrCats} />
            </section>

            <section className="changes-container">
                <button type="submit" className="pointer save-changes-button">
                    Save Changes
                </button>
                <button type="button" className="pointer cancel-changes-button" onClick={() => handleCancel()} >
                    Cancel
                </button>
            </section>
        </form>
    )
}

export default EditProduct
