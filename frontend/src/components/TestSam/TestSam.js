import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { addDiscountThunk, deleteDiscount, deleteDiscountThunk, editDiscountThunk, loadAllDiscountsThunk } from "../../store/discount"
import { clearUser, login } from "../../store/session"
import { loadAllProductCategoriesThunk } from "../../store/productcategory"
import { clearProductCart, loadAllProductCartsThunk, loadUserProductCartThunk } from "../../store/productcart"
import { csrfFetch } from "../../store/csrf";
import { addUserCartThunk, clearCart, loadUserCartThunk } from "../../store/cart";
import { addStripeSessionThunk } from "../../store/stripesession";

function TestSam() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)


    // creating a new discount address
    const [codeName, setCodeName] = useState("")

    useEffect(() => {
        dispatch(loadUserProductCartThunk())

        dispatch(loadUserCartThunk())

        dispatch(clearUser())
        dispatch(clearProductCart())
        dispatch(clearCart())
        setLoad(true)
    }, [dispatch, refresh])

    const productCart = useSelector(state => state.productCart)
    const userCart = useSelector(state => state.cart)
    const user = useSelector(state => state.session.user)

    const demoSignIn = (e) => {
        e.preventDefault()

        const demoUser = {
            credential: "demo@aa.io",
            password: "password"
        }
        dispatch(login(demoUser))
    }

    const adminSignIn = (e) => {
        e.preventDefault()

        const adminUser = {
            credential: "admin@aa.io",
            password: "password"
        }
        dispatch(login(adminUser))
    }


    const checkout = async (e) => {
        try {
            // Create a Stripe session
            const sessionResponse = await csrfFetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!sessionResponse.ok) {
                history.push('/');
                return;
            }

            const sessionData = await sessionResponse.json();

            const newStripeSession = {
                userId: user.id,
                sessionId: sessionData.data.id,
                cartId: userCart[0].id
            }

            await dispatch(addStripeSessionThunk(newStripeSession))

            // Redirect the user to the Stripe checkout page
            window.location.href = sessionData.data.url
        } catch (error) {
            // Handle any other errors that may occur
            history.push('/');
        }
    }

    const createNewCart = (e) => {
        e.preventDefault()
        dispatch(addUserCartThunk())
    }

    return load ? (
        <div>
            <section>
                <button onClick={adminSignIn}>Admin Sign In</button>
                <button onClick={demoSignIn}>Demo Sign In</button>
            </section>
            <section>
                <button onClick={(e) => createNewCart(e)}>create new cart</button>
                <button>delete cart</button>
            </section>
            <section>
                {Object.values(userCart).map(el => (
                    <div>
                        <p>{el.id}</p>
                    </div>
                ))}
            </section>
            <section>
                {Object.values(productCart).map(el => (
                    <div key={el.productId}>
                        <p>Product ID: {el.productId}</p>
                        <p>Price per Unit: {el.pricePerUnit}</p>
                        <p>Quantity: {el.quantity}</p>
                    </div>
                ))}
            </section>
            <button onClick={checkout}>Checkout</button>
        </div>
    ) : (
        <div></div>
    );
}

export default TestSam
