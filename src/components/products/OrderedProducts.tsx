import React,{useCallback} from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/styles";
import {PrimaryButton} from "../UIkit";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"
import NoImage from '../../assets/img/src/no_image.png'


const useStyles = makeStyles((theme) => ({
    list: {
        background: '#fff',
        height: 'auto'
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
}))


const OrderedProducts = (props:any) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = props.products;
    // const product = products[0];

    const goToProductDetail = useCallback((id:string)=> {
        dispatch(push("/product/"+id))
    },[])

    // products.map((product:any, index:number) => {
    //     console.log("id= " + product.id);
    //     console.log("name= " + product.name);
    //     console.log("size= " + product.size);
    // });

    return (
        <>
        <List>
            {products.map((product:any, index:number) => (
                <>
                    <ListItem className={classes.list} key={product.id}>
                        <ListItemAvatar>
                            <img 
                                className={classes.image}
//                                src={product.images[0].path}
                                src={NoImage}
                                alt={"Orderd Product"} />
                        </ListItemAvatar>
                        <div className={classes.text}>
                            <ListItemText
                                primary={product.name}
                                secondary={"サイズ： " + product.size}
                            />
                        </div>
                        <PrimaryButton
                            label={"商品詳細を見る"}
                            onClick={() => goToProductDetail(product.id)}
                        />
                    </ListItem>
                    <Divider />
                </>
            ))}

        </List>
        </>
    )

}


export default OrderedProducts