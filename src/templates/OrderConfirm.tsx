import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {PrimaryButton, TextDetail} from "../components/UIkit";
import {orderProduct} from "../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320
    },
    [theme.breakpoints.up('md')]: {
      width: 512
    },
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  let productsInCart = getProductsInCart(selector);

  const productsList = [
    {cartId: "0001", size: "S", price: 1000, name:"商品１"},
    {cartId: "0002", size: "M", price: 2000, name:"商品２"},
    {cartId: "0003", size: "L", price: 3000, name:"商品３"},
  ]
  productsInCart = productsList;
  
  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum:number, product:any) => sum += product.price, 0)
  }, [productsInCart])

  const shippingFee = useMemo(() => (subtotal >= 10000) ? 0 : 210, [subtotal])
  const tax = useMemo(() => (subtotal) * 0.1, [subtotal, shippingFee])
  const total = useMemo(() => subtotal + shippingFee + tax, [subtotal, shippingFee, tax])

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 && (
              productsInCart.map((product:any) => <CartListItem product={product} key={product.cartId}/>)
            )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={"商品合計"} value={"¥" + subtotal.toLocaleString()}/>
          <TextDetail label={"送料"} value={"¥" + shippingFee.toLocaleString()}/>
          <TextDetail label={"消費税"} value={"¥" + tax.toLocaleString()}/>
          <Divider/>
          <div className="module-spacer--extra-extra-small"/>
          <TextDetail label={"合計(税込)"} value={"¥" + total.toLocaleString()}/>
          <PrimaryButton label={"注文を確定する"} onClick={order}/>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;