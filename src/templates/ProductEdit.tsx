import React, {useState, useCallback, useEffect} from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit';
import {useDispatch} from "react-redux"
import {saveProduct} from "../reducks/products/operations"
import {ImageArea, SetSizesArea} from "../components/products";

const ProductEdit = () => {
    const dispatch = useDispatch();

    let id = window.location.pathname.split('/product/edit')[1];
    console.log("Before split",id);

    if (id !== "") {
        id = id.split('/')[1];
        console.log("After split / ", id);
    }

    const [name, setName] = useState(""),
            [description, setDescription] = useState(""),
            [images, setImages] = useState(""),
            [category, setCategory] = useState(""),
            [categorys, setCategorys] = useState([{}]),
            [gender, setGender] = useState(""),
            [price, setPrice] = useState(""),
            [sizes, setSizes] = useState([]);


    const inputNmae = useCallback((event:any) => {
        setName(event.target.value)
    }, [setName])

    const inputDescription = useCallback((event:any) => {
        setDescription(event.target.value)
    }, [setDescription])

    const inputPrice = useCallback((event:any) => {
        setPrice(event.target.value)
    }, [setPrice])

    const categories = [
        {id: "tops", name: "トップス"},
        {id: "shirts", name: "シャツ"},
        {id: "tops", name: "パンツ"},
    ]

    const genders = [
        {id: "all", name: "すべて"},
        {id: "male", name: "メンズ"},
        {id: "female", name: "レディース"},
    ]

    const sizesData = [
        {index: 0, size: "S", quantity:1},
        {index: 1, size: "M", quantity:3},
        {index: 2, size: "L", quantity:4},
    ]

    useEffect(() => {
        setCategorys(categories);
    },[])

    useEffect(() => {
        if(id !== ""){
            // debugger.collection('products').doc(id).get()
            //     .then(snapshot => {
            //         const data = snapshot.data();
            //         setName(data.name);
            //         setImages(data.images);
            //         setGender(data.gender);
            //         setDescription(data.description);
            //         setPrice(data.price);
            //     })
        }
    }, [id])


    return (
        <section>
            <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputNmae} rows={1} value={name} type={"text"}
                    />
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                    />
                <SelectBox
                    label={"カテゴリー"} required={true} options={categorys} select={setCategory} value={category}
                    />
                <SelectBox
                    label={"性別"} required={true} options={genders} select={setGender} value={gender}
                    />

                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                    />

                <div className="module-spacer--small"/>
                <SetSizesArea sizes={sizesData} setSizes={setSizes} />
                <div className="module-spacer--small" />
                <div className="center">
                        <PrimaryButton
                            label={"商品情報を保存"} onClick={() => dispatch(saveProduct(id,name,description,category,gender,price,sizes,images))}
                            />
                </div>

            </div>
        </section>
    )
}

export default ProductEdit