import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {resetPassWord} from "../reducks/users/operations";

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")

    const inputEmail = useCallback((e:any) => {
        setEmail(e.target.value)
    },[]);

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">パスワードリセット</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton label={"リセットパスワード"} onClick={() => dispatch(resetPassWord(email))} />
            </div>
        </div>
    );
};

export default Reset;