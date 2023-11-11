import "./PaymentSuccess.css"

import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStripeSessionThunk, loadStripeSessionThunk } from "../../../store/stripesession";
import { addUserCartThunk, deleteCartThunk } from "../../../store/cart";
import { loadUserProductCartThunk } from "../../../store/productcart";
import { loadAllProductsThunk } from "../../../store/product";
import { addOrderThunk } from "../../../store/order";

function StripePaymentSuccess() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [urlSessionId, setUrlSessionId] = useState()
    const [load, setLoad] = useState(false)
    const [productCartLoaded, setProductCartLoaded] = useState(false)

    // useEffect to first get the url stripe session id
    useEffect(() => {
        // get stripe checkout session id
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const stripeSessionId = urlParams.get('session_id');

        setUrlSessionId(stripeSessionId)
    }, [])

    // second useEffect to load the stripe session that exists on the database
    // dependent on the url stripe session id
    useEffect(() => {
        if (urlSessionId) {
            dispatch(loadAllProductsThunk())
            dispatch(loadStripeSessionThunk(urlSessionId)).then(
                setLoad(true)
            )
        }
    }, [urlSessionId, dispatch])

    const dbSessionId = useSelector(state => state.stripeSession)
    const productCart = useSelector(state => state.productCart)
    const allProducts = useSelector(state => state.product)

    // provided that there is a stripe session id on the database that matches url session id, dispatch actions
    // useeffect to delete stripe session. Ideally, you'd use webhooks to confirm whether a customer paid for an order. this is just a stop gap
    useEffect(() => {
        if (load && dbSessionId !== undefined && dbSessionId.length > 0) {
            dispatch(loadUserProductCartThunk()).then(() => {
                setProductCartLoaded(true)
            })
        }
        // if (load && dbSessionId !== undefined && dbSessionId.length === 0) {
        //     history.push('/');
        // }
    }, [load, dbSessionId]);


    useEffect(() => {
        let cartId;

        let productCartArr = Object.values(productCart)
        for (let i = 0; i < productCartArr.length; i++) {
            const curr = productCartArr[i]
            cartId = curr.cartId
            const orderItem = {
                cartId: curr.cartId,
                productId: curr.id,
                productName: allProducts[curr.id]["productName"],
                productDescription: allProducts[curr.id]["productDescription"],
                quantity: curr.quantity,
                pricePerUnit: curr.pricePerUnit,
            };

            dispatch(addOrderThunk(orderItem));
        }

        // delete the stripe session
        dispatch(deleteStripeSessionThunk(urlSessionId))

        // Once the stripe session is deleted, delete the cart and add a new one. will delete all associated productcart items
        dispatch(deleteCartThunk(cartId))

        // create new cart for user to use
        dispatch(addUserCartThunk());

    }, [productCartLoaded])

    return (
        <div id="payment-success-container">
            <section id="payment-success-header">
                Payment Success! Thank you for shopping with us.
            </section>
            <section>
                Expect your order soon.
            </section>
            <section>
                <button id="back-button" onClick={() => history.push('/')}>
                    Go Back
                </button>
            </section>
        </div>
    )
}

export default StripePaymentSuccess
