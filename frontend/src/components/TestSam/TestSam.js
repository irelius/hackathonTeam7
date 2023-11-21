import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"
import * as discountActions from "../../store/discount"
import * as orderActions from "../../store/order"
import * as productActions from "../../store/product"
import * as productCartActions from "../../store/productcart"
import * as productCategoryActions from "../../store/productcategory"
import * as reviewActions from "../../store/review"

function TestSam() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(reviewActions.loadAllReviewsThunk())
    }, [])

    const review = useSelector(state => state.review)
    console.log("booba", review)

    const handleTest = (e) => {
        e.preventDefault()

        const newReview = {
            productId: 1,
            review: "test review",
            rating: 5,
        }

        const editReview = {
            productId: 1,
            review: "asdf review",
            rating: 1,
        }

        // dispatch(reviewActions.addReviewThunk(newReview))
        // dispatch(reviewActions.editReviewThunk(1, editReview))

        dispatch(reviewActions.deleteReviewThunk(1))
    }

    return (
        <div>
            <button onClick={handleTest}>Test</button>
        </div>
    )

}

export default TestSam
