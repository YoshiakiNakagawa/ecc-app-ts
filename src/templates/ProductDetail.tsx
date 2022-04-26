import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
//import {db, FirebaseTimestamp} from "../firebase";
import {SizeTable ,ImageSwiper} from "../components/products";
import HTMLReactParser from 'html-react-parser'
import {addProductToCart} from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
    sliderBox: {
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 24px auto',
        height: 320,
        width: 320,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 400,
        width: 400,
      },
    },
    detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 16px auto',
        height: 'auto',
        width: 320,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 'auto',
        width: 400,
      },
    },
    price: {
      fontSize: 36,
    },
  }))
  
const returnCodeToBr = (text: string) => {
  if (text === '') return text
  return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
}

const ProductDetail = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
//    const path = selector.router.location.pathname
    const path = window.location.pathname
    const id = path.split('/product/')[1]

    const [product, setProduct] = useState({
        added_at: Date.now(),
            description: "",
            gender: "",
            images: "",
            name: "",
            price: "",
            productId: "",
            quantity: 1,
            size: [{}]
    });

    useEffect(() => {
        // db.collection('products').doc(id).get().then(doc => {
        //     const data = doc.data()
        //     setProduct(data)
        // })
        const data = { 
            added_at: Date.now(),
            description: "商品説明",
            gender: "male",
            images: "",
            name: "商品１",
            price: "1000",
            productId: "0001",
            quantity: 3,
            size: [
                {size:23.5, quantity:0 },
                {size:24.5, quantity:1 },
                {size:25.5, quantity:2 },
                {size:26.5, quantity:3 },
                {size:27.5, quantity:4 },
            ]
        }
        setProduct(data);
    },[])

    const addProduct = useCallback(
      (selectedSize:number) => {

      //      const timestamp = FirebaseTimestamp.now();
            const timestamp = Date.now();

            dispatch(
              addProductToCart({
                added_at: timestamp,
                description: product.description,
                gender: product.gender,
                images: product.images,
                name: product.name,
                price: product.price,
                productId: product.productId,
                quantity: 1,
                size: selectedSize
              }
            ))
    },[product])

    return (
        <section className="c-section-wrapin">
            {product && (
                <div className="p-grid__row">
                    <div className={classes.sliderBox}>
                        <ImageSwiper images={product.images}/>
                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>¥{(product.price).toLocaleString()}</p>
                        <div className="module-spacer--small"/>
                        <SizeTable addProduct={addProduct} sizes={product.size} />
                        <div className="module-spacer--small"/>
                        <p>{returnCodeToBr(product.description)}</p>                        
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductDetail