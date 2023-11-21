import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"
import * as discountActions from "../../store/discount"
import * as orderActions from "../../store/order"
import * as productActions from "../../store/product"
import * as productCartActions from "../../store/productcart"
import * as productCategoryActions from "../../store/productcategory"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(productCategoryActions.loadAllProductCategoriesThunk())

        dispatch(productCategoryActions.clearProductCategory())
    }, [])

    const productCategory = useSelector(state => state.productCategory)
    console.log(productCategory)

    const handleTest = (e) => {
        e.preventDefault()

        const newPC = ["Black", "Indoor"]
        const editPC = ["White", "Outdoor"]

        const editProduct = {
            productName: "edit product",
            productDescription: "edit product descript",
            productPrice: 999,
            productQuantity: 999
        }

        const productQuantity = 1

        // dispatch(productCategoryActions.editProductCategoryThunk(1, editPC))

        dispatch(productCategoryActions.deleteProductCategoryThunk(3))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam
