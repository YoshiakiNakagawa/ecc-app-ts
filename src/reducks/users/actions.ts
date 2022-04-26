export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState:any) => {
    return {
        type: "SIGN_IN",
        payload: userState
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: null
    }
};

export const UPDATE_USER_STATE = "UPDATE_USER_STATE";
export const updateUserStateAction = (userState:any) => {
    return {
        type: "UPDATE_USER_STATE",
        payload: userState
    }
};

export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products:any) => {
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
}

export const FETCH_ORDERS_HISTORY = "FETCH_ORDERS_HISTORY";
export const fetchOrdersHistoryAction = (history:any) => {
    return {
        type: "FETCH_ORDERS_HISTORY",
        payload: history
    }
}


