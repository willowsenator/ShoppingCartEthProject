import React, { useContext, useEffect, useState } from "react";
import { Context } from "../src/App.jsx";
import {ethers} from "ethers";
import { Link } from "react-router-dom";

export function Cart() {
    const [status, setStatus] = useContext(Context);
    const [account, setAccount] = useState(null);
    const [txOk, setTxOk] = useState(null);
    const [txKo, setTxKo] = useState(null);

    const cartTotalPrice = status.cart.reduce((accumulator, item)=> accumulator + item.total, 0);

    useEffect(()=>{
        window.ethereum && window.ethereum.request({
            method: 'eth_requestAccounts'
        }).then(accounts => {
            setAccount(accounts[0]);
            window.ethereum.on("accountsChanged",(accounts)=>{
                setAccount(accounts[0]);
            });
        });
    },[]);

    function pay(){
        const txParams = {
            to: "",
            from: account,
            value: ethers.toBeHex(ethers.parseEther(cartTotalPrice.toString()))
        };

        try {
            const tx = window.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams]
            });

            setTxOk(tx);
        } catch (error) {
            setTxKo(error);
        }
    }

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
                        <td><Link to={`/product/${item.product.product_id}`}>{item.product.product_id}</Link></td>
                        <td>{item.product.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.unit_price}</td>
                        <td>{item.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Total {cartTotalPrice}</h3>
        <h4>Account: {account}</h4>
        <button onClick={()=>pay()} className="btn btn-primary">Pay</button>
        {txOk && <div className="alert alert-success">{txOk}</div>}
        {txKo && <div className="alert alert-danger">{txKo}</div>}
    </div>);
}