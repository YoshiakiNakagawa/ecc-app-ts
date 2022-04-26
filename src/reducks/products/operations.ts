import {deleteProductAction ,fetchProductsAction} from "./actions"
import { push } from 'connected-react-router'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

//import{db, FirebaseTimestamp} from "../../firebase"
//const productsRef = db.collection('products')

export const orderProduct = (
    produtsInCart:any[],
    price:number  
): ThunkAction<void, any, unknown, AnyAction> => 
async (dispatch:any,getState:any) => {

    const uid = getState().users.uid;
//    const userRef = db.collection('users').doc(uid);
//    const userRef = [];
//    const timestamp = FirebaseTimestamp.now();
    let products: any[] = [];
    let soldOutProducts: string[] = [];

    //    const batch = db.batch();


    for (const product of produtsInCart) {
        // const snapshot = await productsRef.doc(product.productId).get();
        // const sizes = snapshot.data().sizes;  

        const sizes = [{size: 1, quantity: 1},{size: 1, quantity: 1}];
        const updateSizes = sizes.map((size:any) => {
            if (size.size === product.size) {
                if (size.quantity === 0) {
                    soldOutProducts.push(product.name);
                    return size
                }
                return {
                    size: size.size,
                    quantity: size.quantity - 1
                }
            } else {
                return size
            }
        });

        products[product.productId] = {
            id: product.productId,
            images: product.images,
            name: product.name,
            price: product.price,
            size: product.size
        };

        // batch.update(productsRef.doc(product.productId), {sizes: updateSizes});
        // batch.delete(userRef.collection('cart').doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
        const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
        alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
        return false
    } else {

    }
}

export const deleteProduct = (
    id:string  
    ): ThunkAction<void, any, unknown, AnyAction> => 
    async (dispatch:any,getState:any) => {
    //   productsRef.doc(id).delete()
    //     .then(() => {
          const prevProducts = getState().products.list
          const nextProducts = prevProducts.filter((product:any) => product.id !== id)
          dispatch(deleteProductAction(nextProducts))
        // })
    }

    
export const fetchProducts = (
    gender:string,
    category:string,
): ThunkAction<void, void, unknown, AnyAction> => 
async (dispatch:any) => {
//   let query = productsRef.orderBy('updated_at', 'desc');
//   query = (gender !== "") ? query.where('gender', '==', gender) : query;
//   query = (category !== "") ? query.where('category', '==', category) : query;

//   query.get()
//     .then(snapshots => {
    //   const productList = []
    //   snapshots.forEach(snapshot => {
    //     const product = snapshot.data()
    //     productList.push(product)
    //   })
//            dispatch(fetchProductsAction(productList))
        dispatch(fetchProductsAction([]))
    // })
}
  

export const saveProduct = (
    id:string,
    name:string,
    description:string,
    category:string,
    gender:string,
    price:string,
    sizes:never[],
    images:any,
): ThunkAction<void, void, unknown, AnyAction> => 
async (dispatch:any) => {
//        const timestamp = FirebaseTimestamp.now()
    const timestamp = Date.now()

    const data = {
        category : category,
        description : description,
        gender : gender,
        name:name,
        price:parseInt(price,10),
        updated_at:timestamp,
        id: "",
        created_at: 0
    }

    if(id === "") {
        // const ref = productsRef.doc();
        // const id = ref.id
        // data.id = id
        // data.created_at = timestamp

    }

    // return productsRef.doc(id).set(data, {merge:true})
    //     .then(() => {
            dispatch(push('/'))
        // }).catch((error:any) => {
        //     throw new Error(error)
        // })
}
