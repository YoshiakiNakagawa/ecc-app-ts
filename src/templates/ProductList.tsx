import React, {useEffect} from 'react';
import {ProductCard} from "../components/products";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../reducks/products/selectors";
import {fetchProducts} from "../reducks/products/operations";

const ProductList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    let products = getProducts(selector)

    const query = window.location.search
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : ""
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ""

    const productsList = [
        {id: "0001", price: 1000, name:"商品１"},
        {id: "0002", price: 2000, name:"商品２"},
        {id: "0003", price: 3000, name:"商品３"},
    ]
    products = (products.length === 0) ? productsList : products;

    useEffect(() => {
        dispatch(fetchProducts(gender, category))
    },[query])

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {products.length > 0 && (
                    products.map((product:any) => (
                        <ProductCard
                            key={product.id} id={product.id} images={product.images}
                            price={product.price} name={product.name}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductList;