import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/products";
import {PrimaryButton, GreyButton} from "../components/UIkit";
import {push} from "connected-react-router"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  },
}));

const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  let productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []);

  const backToTop = useCallback(() => {
    dispatch(push('/'))
  }, []);

  const productsList = [
    {cartId: "0001", size: "S", price: 1000, name:"商品１"},
    {cartId: "0002", size: "M", price: 2000, name:"商品２"},
    {cartId: "0003", size: "L", price: 3000, name:"商品３"},
  ]
  productsInCart = productsList;

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 && (
          productsInCart.map((product:any) => <CartListItem product={product} key={product.cartId}/>)
        )}
      </List>
      <div className="module-spacer--medium"/>
      <div className="p-grid__column">
        <PrimaryButton label={"レジへ進む"} onClick={goToOrder}/>
        <div className="module-spacer--extra-extra-small"/>
        <GreyButton label={"ショッピングを続ける"} onClick={backToTop}/>
      </div>
    </section>
  );
};

export default CartList;