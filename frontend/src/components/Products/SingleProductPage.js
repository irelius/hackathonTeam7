import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadOneProductThunk } from "../../store/product";


function SingleProductPage() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const product = useSelector((state) => state.product)


    useEffect(() => {
        dispatch(loadOneProductThunk(id))
    }, [dispatch])

    return (
        <>
        <div className="product-container">
            <div className="product left">
            <p>Product image</p>
            </div>
            <div className="product right">
                <h1>{product.productName}</h1>
                <p>{product.productPrice}</p>
            </div>
        </div>
        </>

    )
}

export default SingleProductPage;
