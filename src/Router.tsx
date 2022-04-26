import React from 'react';
import { Switch, Route} from "react-router";
import { SignIn, SignUp, Reset, ProductEdit, ProductList,ProductDetail,CartList,OrderConfirm,OrderHistory } from "./templates";
import {Auth} from './Auth'

const Router = () => {

    console.log("Router!!");

    return (
            <Switch>
                <Route exact path={'/signup'} component={SignUp} />
                <Route exact path={'/signin'} component={SignIn} />
                <Route exact path={'/signin/reset'} component={Reset} />

                <Auth>
                    <Route exact path="(/)?" component={ProductList} />
                    <Route exact path="/product/:id" component={ProductDetail} />
                    <Route path="/product/edit(/:id)?" component={ProductEdit} />

                    <Route exact path="/cart" component={CartList} />
                    <Route exact path="/order/confirm" component={OrderConfirm} />
                    <Route exact path="/order/history" component={OrderHistory} />

                </Auth>

            </Switch>
                
        // <>
        // {/* // Routerを利用していないため小細工 */}
        // { (window.location.pathname === '/') && (
        //     <SignIn />
        // )} 
        // { (window.location.pathname === '/signin') && (
        //     <SignIn />
        // )} 
        // { (window.location.pathname === '/signup') && (
        //     <SignUp />
        // )} 
        // { (window.location.pathname === '/signin/reset') && (
        //     <Reset />
        // )} 
        // { (window.location.pathname.startsWith("/product/edit")) && (
        //     <ProductEdit />
        // )} 
        // { (window.location.pathname === '/product/list') && (
        //     <ProductList />
        // )} 
        // { (window.location.pathname === '/product/detail') && (
        //     <ProductDetail />
        // )} 
        // </>
    );
};

export default Router;