import "./CreateProduct.css"
import { useDispatch } from "react-redux"
import { useState } from "react"

import * as productActions from "../../../../store/product"
import * as productCategoryActions from "../../../../store/productcategory"
import CategorySection from "../../ReusableSections/CategorySection"
import CurrencyInput from 'react-currency-input-field';

function CreateProduct() {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(1)
    const [quantity, setQuantity] = useState(1)
    // edit this part for images. just using a url for a stock image temporarily
    const [image, setImage] = useState("https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4")

    const [categories, setCategories] = useState({})
    const [currCats, setCurrCats] = useState({})

    const handleCategorySelection = (updatedCategories) => {
        setCategories(updatedCategories)
    }

    const handleClear = (e) => {
        e.preventDefault()

        setCurrCats({})
        setName("")
        setDescription("")
        setPrice(1.00)
        setQuantity(1)
        setImage("https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4")
    }

    const handleSubmit = () => {
        const newProduct = {
            productName: name,
            productDescription: description,
            productPrice: price * 100,
            productQuantity: quantity
        }

        dispatch(productActions.addProductThunk(newProduct)).then(res => {
            dispatch(productCategoryActions.addProductCategoryThunk(res.data.id, Object.keys(categories)))
        })
    }


    return (
        <form onSubmit={() => handleSubmit()} className="create-container">
            <div id='product-div'>
                <section className='create-header'>Create a New Product</section>

                <section id='create-product-section-container'>
                    <section>
                        <aside>
                            <section className="input-header">Product Name</section>
                            <input
                                type="text"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </aside>
                        <aside>
                            <section className="input-header">Product Description</section>
                            <textarea
                                type="text"
                                id='product-description-section'
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </aside>
                        <aside>
                            <section className="input-header">Product Price</section>
                            <CurrencyInput
                                name="product-price-input"
                                required
                                prefix="$"
                                decimalsLimit={2}
                                onValueChange={(value, name, e) => setPrice(value)}
                                value={price}
                            />
                        </aside>
                        <aside>
                            <section className="input-header">Product Quantity</section>
                            <input
                                type="number"
                                required
                                onChange={(e) => setQuantity(e.target.value)}
                                value={quantity}
                            />
                        </aside>
                        <aside>
                            <section className="input-header">Product Image</section>
                            <input
                                type="text"
                                required
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </aside>
                    </section>
                </section>

                <section>
                    <CategorySection onCategoryChange={handleCategorySelection} currCats={currCats} setCurrCats={setCurrCats} />
                </section>


                <section className="changes-container">
                    <button type="submit" className="pointer save-changes-button">Create New Product</button>
                    <button type="button" className="pointer cancel-changes-button" onClick={(e) => handleClear(e)}>Clear</button>
                </section>
            </div>
        </form>
    )
}

export default CreateProduct
