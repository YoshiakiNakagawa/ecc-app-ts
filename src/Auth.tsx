import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getIsSignedIn} from "./reducks/users/selectors";
import {listenAuthState} from "./reducks/users/operations";

type AuthPropsType = {
    children: React.ReactNode
  }

  export const Auth: React.VFC<AuthPropsType> = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const isSignedIn = getIsSignedIn(selector);
  
    useEffect(() => {
      if (!isSignedIn) {
        dispatch(listenAuthState());
      }
    }, [])
  
    return <>{isSignedIn && children}</>
  }