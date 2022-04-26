import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {configureStore } from '@reduxjs/toolkit'

// Import reducers
import {UsersReducer} from '../users/reducers';
import {ProductsReducer} from '../products/reducers';

// createStoreの再定義 - historyを引数で受け、connected-react-routerの利用を抽象化
export default function createStore(history:any) {

    return reduxCreateStore( // オリジナル createStore の別名
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
            products: ProductsReducer,
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    );
}

export const store = configureStore({
  reducer: {
    users: UsersReducer,
    products: ProductsReducer,
}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch