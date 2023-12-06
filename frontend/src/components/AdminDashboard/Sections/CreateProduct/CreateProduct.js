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
    const [price, setPrice] = useState(1.00)
    const [quantity, setQuantity] = useState(1)
    // edit this part for images. just using a url for a stock image temporarily
    const [image, setImage] = useState("https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4")

    const [categories, setCategories] = useState({})
    const [currCats, setCurrCats] = useState({})

    const handleCategorySelection = (updatedCategories) => {
        setCategories(updatedCategories)
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
        <div id="temp">
            <section>
                <div>Create a New Product</div>
            </section>
            <section>
                <section>
                    <section>Product Name</section>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </section>
                <section>
                    <section>Product Description</section>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </section>
                <CurrencyInput
                    name="product-price-input"
                    prefix="$"
                    defaultValue={`${price}.00`}
                    decimalsLimit={2}
                    onValueChange={(value, name, e) => setPrice(value)}
                />
                <section>
                    <section>Product Quantity</section>
                    <input
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        defaultValue={quantity}
                    />
                </section>
                <section>
                    <section>Product Image</section>
                    <input
                        type="text"
                        onChange={(e) => setImage(e.target.value)}
                        defaultValue={image}
                    />
                </section>
            </section>

            <section>
                <section id="category-section">
                    <CategorySection onCategoryChange={handleCategorySelection} currCats={currCats} setCurrCats={setCurrCats} />
                </section>
            </section>


            <section>
                <section>
                    <button onClick={handleSubmit}>Create New Product</button>
                    <button onClick={() => setCurrCats(prevState => ({}))}>Clear</button>
                </section>
            </section>

        </div>
    )
}

export default CreateProduct
