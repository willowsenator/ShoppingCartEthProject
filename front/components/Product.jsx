import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {useQuery} from "react-query";
import {useForm} from 'react-hook-form';
import {Context} from "../src/App.jsx";

export function Product(){
    const params = useParams();

    const {data, isLoading} = useQuery(`product_${params.id}`, async()=>{
        const res = await fetch(`http://127.0.0.1:9800/product/${params.id}`, { method: "GET" });
        return await res.json();
    });
    const [status, setStatus] = useContext(Context);
    const quantity = status.cart.find(item => item.product.product_id == params.id)?.quantity;
    const [productAddedToCartOk, setProductAddedToCartOk] = useState(null);
    const [productAddedToCartKo, setProductAddedToCartKo] = useState(null);
    const {register, handleSubmit} = useForm(
        {
            defaultValues: {
                quantity: quantity
            }
        }
    );

    function onSubmit(dataForm){
        initProductCartMessages();
        if(dataForm.quantity > 0){
	    setProductAddedToCartOk("Product added to Cart");
            setStatus({
	         ...status,
                  cart: [...status.cart.filter(item => item.product.product_id != params.id),
                  {
                	product: data[0],
		                quantity: dataForm.quantity,
           	        	total: dataForm.quantity * data[0].unit_price
                  }]
	        });
	} else {
		setProductAddedToCartKo("You must add a quantity greater than 0");
	}
    }

    function initProductCartMessages() {
       setProductAddedToCartOk(null);
       setProductAddedToCartKo(null);
    }

    if(isLoading){
        return (<div><h1>Loading...</h1></div>);
    } else{
        return (<div>
            <h1>PRODUCT DETAILS</h1>
            <table className="table"> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <td>{data[0].product_id}</td>
                    </tr>
                    <tr>
                        <th>NAME</th>
                        <td>{data[0].product_name}</td>
                    </tr>
                    <tr>
                        <th>QUANTITY_PER_UNIT</th>
                        <td>{data[0].quantity_per_unit}</td>
                    </tr>
                    <tr>
                        <th>UNIT_PRICE</th>
                        <td>{data[0].unit_price}</td>
                    </tr>
                    <tr>    
                        <th>UNITS_IN_STOCK</th>
                        <td>{data[0].units_in_stock}</td>
                    </tr>
                    <tr>
                        <th>DISCONTINUED</th>
                        <td>{data[0].discontinued == 1 ? 'YES' : 'NO'}</td>
                    </tr>
                </thead>
            </table>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="product_quantity">
                       Type a quantity
                    </label>
                    <input {...register("quantity")} id="product_quantity" type="number" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add to cart</button>
            </form>
            {productAddedToCartOk && <div className="alert alert-success">{productAddedToCartOk}</div>}
            {productAddedToCartKo && <div className="alert alert-danger">{productAddedToCartKo}</div>}  
        </div>);
    }
}
