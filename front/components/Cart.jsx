import React, { useContext } from "react";
import { Context } from "../src/App.jsx";

export function Cart() {
    const [status, setStatus] = useContext(Context);

    const cartTotalPrice = status.cart.reduce((accumulator, item)=> accumulator + item.total, 0);

    return (<div>
        <h1>Cart</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th>TOTAL</th>
                </tr>
            </thead>
            <tbody>
                {status.cart.map(item => (
                    <tr key={item.product.product_id}>
                        <td>{item.product.product_id}</td>
                        <td>{item.product.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.unit_price}</td>
                        <td>{item.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h2>Total {cartTotalPrice}</h2>
    </div>);
}