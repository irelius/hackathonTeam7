import "./TestSam.css"

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as addressActions from "../../store/address"
import * as cartActions from "../../store/cart"
import * as discountActions from "../../store/discount"
import * as orderActions from "../../store/order"
import * as productActions from "../../store/product"
import * as productCartActions from "../../store/productcart"
import * as productCategoryActions from "../../store/productcategory"
import * as reviewActions from "../../store/review"
import * as discountCategoryActions from "../../store/discountcategory"

function TestSam() {
    const dispatch = useDispatch();

    const [expand, setExpand] = useState(false);

    return (
        <div id='asdf'>
            <button onClick={() => setExpand((prevState) => !prevState)}>Toggle</button>
            <div className={`expandable-div ${expand ? 'expanded' : ''}`}>
                {expand ? <div>booba</div> : null}
            </div>
        </div>
    );
}

export default TestSam
