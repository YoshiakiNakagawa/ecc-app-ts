import React, {useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import List from "@material-ui/core/List"
import {makeStyles} from "@material-ui/core/styles"
import {getOrdersHistory} from "../reducks/users/selectors"
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../components/products'

const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    },
}))

const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
//    const orders = getOrdersHistory(selector)
    const today = new Date();
    const orders = [
        {id:"0001",updated_at:today,shipping_date:today,amount:1000,products:[
                                                                        {id:"0001",name:"商品１",size:"S"},
                                                                        {id:"0002",name:"商品２",size:"M"}
                                                                    ]
        }
]

    useEffect(() => {
        dispatch(fetchOrdersHistory())
    },[])

    return (
        <section className="c-section-wrapin">
            {/* <div>test OrderHistory</div> */}
            <List className={classes.orderList} >
                {orders.length > 0 && (
                    orders.map((order:any) => <OrderHistoryItem order={order} key={order.id} />)
                )}

            </List>

        </section>


    )
    
}


export default OrderHistory