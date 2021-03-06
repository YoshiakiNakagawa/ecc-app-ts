import React from 'react'
import Divider from "@material-ui/core/Divider"
import { TextDetail } from '../UIkit'
import { orderProduct } from '../../reducks/products/operations'
import { OrderedProducts } from './'

const datetimeToString = (date:Date) => {
    return date.getFullYear() + '-'
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' + date.getDate()).slice(-2) + " "
        + ('00' + date.getHours()).slice(-2) + ":"
        + ('00' + date.getMinutes()).slice(-2) + ":"
        + ('00' + date.getSeconds()).slice(-2)
}

const datetToString = (date:Date) => {
    return date.getFullYear() + '-'
        + ('00' + (date.getMonth()+1)).slice(-2) + "-"
        + ('00' + date.getDate()).slice(-2)
}

const OrderHistoryItem = (props:any) => {
    const order = props.order;
    const orderedDatetime = datetimeToString(order.updated_at);
    const shippingDate = datetToString(order.shipping_date);
    // const orderedDatetime = datetimeToString(new Date());
    // const shippingDate = datetToString(new Date());
    // const orderedDatetime = "";
    // const shippingDate = "";
    const price = "￥" + order.amount.toLocaleString();

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={order.id} />
            <TextDetail label={"注文日時"} value={orderedDatetime} />
            <TextDetail label={"発送予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={price} />
            {order.products.length > 0 && (
                <OrderedProducts products={order.products} />
            )}

            <div className="module-spacer--extra-extra-small" />
            <Divider />

        </div>

    )
}

export default OrderHistoryItem

