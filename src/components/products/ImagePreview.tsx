import React from 'react'


const ImagePreview = (props:any) => {
    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)} >
            <img alt="プレビュー画像" src={props.path} />
        </div>
    )

    
}

export default ImagePreview