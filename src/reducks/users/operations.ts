
import {push} from 'connected-react-router'
import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";

import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import RootState from '../store/store'
import {signInAction} from './actions'
import { Auth } from '../../Auth';
import {fetchProductsInCartAction} from './actions'
import {fetchOrdersHistoryAction} from './actions'

export const fetchOrdersHistory = (
    ): ThunkAction<void, any, unknown, AnyAction> => 
    async (dispatch:any,getState:any) => {
  
      const uid = getState().users.uid;
      const list = [{}];

      // db.collection('user').doc(uid)
      //   .collection('orders')
      //   .orderby('updated_at', 'desc')
      //   .then((snapshots) => {
      //  snapshots.forEach(snapshot => {
      //  const data = snapshot.data()
      //   list.push(data)
      // })
      const snapshots = [
          {},
          {},
          {},        
        ];

        snapshots.map( (snapshot) => {
          const data = snapshot
          list.push(data)
        } )
        dispatch(fetchOrdersHistoryAction(list))
}

export const addProductToCart = (
  addedProduct:any  
  ): ThunkAction<void, any, unknown, AnyAction> => 
  async (dispatch:any,getState:any) => {
      const uid = getState().users.uid;
      // const cartRef = dbcollection('users').doc(uid).collection('cart').doc()
      // addedProduct['cartId'] = cartRef.id;
      // await cartRef.set(addedProduct)
      dispatch(push('/cart'))
    }

export const fetchProductsInCart = (
  products:any,
  ): ThunkAction<void, void, unknown, AnyAction> => 
  async (dispatch:any) => {
      dispatch(fetchProductsInCartAction(products))
  }

export const listenAuthState = (
): ThunkAction<void, void, unknown, AnyAction> => 
async (dispatch:any) => {
        // return AuthenticatorAssertionResponse.onAuthStateChanged( (user:any) => {

//         if (user) {
//           const uid = user.uid;
//           //現在の時間を設定する
//           const timestamp = FirebaseTimestamp.now();

//           //ユーザーのデータの雛形に当てはめる
//           const userInitialData = {
//             created_at: timestamp,
//             email,
//             role: "customer",
//             uid,
//             updated_at: timestamp,
//             username
//           }

//           //firebaseのusersのuidが一致すれば保存しhomeに遷移させる
//           db.collection('users').doc(uid).set(userInitialData)
//             .then(() => {
////               dispatch(push('/'));
//             })
    //         } else {
    //             dispatch(push('/signin'));

    //         }
    //     })
    dispatch(push('/signin'));
    }

// export const signUp = async(username:string, email:string, password:string, confirmPassword:string) => {

//     //emailとpasswordでユーザーを作成する
//     return auth.createUserWithEmailAndPassword(email, password)
//       .then(result => {
//         const user = result.user;

//         //アカウント作成が成功していたら処理を続ける
//         if (user) {
//           const uid = user.uid;
//           //現在の時間を設定する
//           const timestamp = FirebaseTimestamp.now();

//           //ユーザーのデータの雛形に当てはめる
//           const userInitialData = {
//             created_at: timestamp,
//             email,
//             role: "customer",
//             uid,
//             updated_at: timestamp,
//             username
//           }

//           //firebaseのusersのuidが一致すれば保存しhomeに遷移させる
//           db.collection('users').doc(uid).set(userInitialData)
//             .then(() => {
//               dispatch(push('/'));
//             })
//         }
//       })
//   }
//     }


    // if(!isValidRequiredInput(email, password, confirmPassword)) {
    //     alert('必須項目が未入力です。');
    //     return false
    // }

    // if(!isValidEmailFormat(email)) {
    //     alert('メールアドレスの形式が不正です。もう1度お試しください。')
    //     return false
    // }
    // if (password !== confirmPassword) {
    //     alert('パスワードが一致しません。もう1度お試しください。')
    //     return false
    // }
    // if (password.length < 6) {
    //     alert('パスワードは6文字以上で入力してください。')
    //     return false
    // }

    // dispatchDmy('/')
//}


export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): ThunkAction<void, void, unknown, AnyAction> => 
async (dispatch:any) => {
      // Validation
      if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert('必須項目を入力してください')
        return false
      }
  
      if (password !== confirmPassword) {
        alert('パスワードが一致しません。もう一度お試しください')
        return false
      }
  
    //   return auth.createUserWithEmailAndPassword(email, password).then((result) => {
    //     const user = result.user
    //     if (user) {
    //       const uid = user.uid
    //       const timestamp = FirebaseTimestamp.now()
  
    //       const userInitialData = {
    //         created_at: timestamp,
    //         email: email,
    //         role: 'customer',
    //         uid: uid,
    //         updated_at: timestamp,
    //         username: username,
    //       }
  
    //       db.collection('users')
    //         .doc(uid)
    //         .set(userInitialData)
    //         .then(() => {
              dispatch(push('/'))
//            })
//        }
//      })
    }

export const resetPassWord = (
  email: string,
): ThunkAction<void, void, unknown, AnyAction> => 
async (dispatch:any) => {
    if (email === "") {
        alert("必須項目が未入力です");
        return false
    } else {
        // Auth.sendPasswordResetEmail(email)
        //     .then(() => {
                alert('入力されたアドレスにパスワードリセット用のメールを送りました。')
                dispatch(push('/signin'))
            // })
    }
}


export const signIn = (
  email: string,
  password: string
): ThunkAction<void, void, unknown, AnyAction> => 
async (dispatch:any) => {
    console.log('signIn() return')

      if (!isValidRequiredInput(email, password)) {
          alert('メールアドレスかパスワードが未入力です。')
          return false
      }
      if (!isValidEmailFormat(email)) {
          alert('メールアドレスの形式が不正です。')
          return false
      }

      // return auth.signInWithEmailAndPassword(email, password)
      // .then(result => {
      //     const userState = result.user
      //     if (!userState) {
      //         dispatch(hideLoadingAction());
      //         throw new Error('ユーザーIDを取得できません');
      //     }
      //     const userId = userState.uid;

      //     return usersRef.doc(userId).get().then(snapshot => {
      //         const data = snapshot.data();
      //         if (!data) {
      //             dispatch(hideLoadingAction());
      //             throw new Error('ユーザーデータが存在しません');
      //         }

              dispatch(signInAction({
                  customer_id: "001",
                  email: email,
                  isSignedIn: true,
                  role: "",
                  payment_method_id: "",
                  uid: "0001",
                  username: "username",
              }));

              dispatch(push('/'))
      //     })
      // }).catch(() => {
      //     dispatch(hideLoadingAction());
      // });

}


