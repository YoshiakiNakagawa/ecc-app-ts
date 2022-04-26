import React,{useCallback} from 'react'
import IconButton from "@material-ui/core/IconButton"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import {makeStyles} from "@material-ui/styles"
import ImagePreview from "./ImagePreview"

const useStyles = makeStyles({
    icon: {
        height:48,
        width:48
    }

})

const ImageArea = (props:any) => {
    const classes = useStyles();
    const images = props.images;

    const deleteImage = useCallback( async(id:string) => {
        const ret = window.confirm('この画像を削除しますか？');
        if (!ret) {
            return false
        } else {
            const newImages = props.images.filter((image:any) => image.id !== id);
            props.setImages(newImages);
//            return storage.ref('images').child(id).delete()
        }
    }, [props.setImages])



    const UploadImage = useCallback((event:any) => {
        const file = event.target.files;
        let blob = new Blob(file,{type:"image/jpeg"});

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuVwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                            .map((n)=>S[n%S.length]).join('')

        // Fire Strage の処理
        // const uploadRef = strage.ref('images').child(fileaName);
        // const uploadTask = uploadRef.put(blob);

        // uploadTask.then(() => {
        //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //         const newImage = {id: fileName, path:downloadURL};
        //         props.setImages((prevState => [...prevState, newImage]))
        //     })
        // })

        // TODO
        const downloadURL = "";
        const newImage = {id: fileName, path: downloadURL};
        props.setImages(((prevState:any) => [...prevState, newImage]))

    }, [props.setImages])

    return (

        <div>

            <div className="p-grid__list-images">
                {props.images.length > 0 && (
                    props.images.map((image:any ) => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />)
                )}
            </div>

            <div className="u-text-right" >
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input 
                            className="u-display-none" type="file" id="image"
                            onChange={(event) => UploadImage(event)} />
                    </label>
                </IconButton>
            </div>
        </div>

    )
}

export default ImageArea