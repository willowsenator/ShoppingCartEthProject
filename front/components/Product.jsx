import React from "react";
import { useParams } from "react-router-dom";
import {useQuery} from "react-query";

export function Product(){
    let params = useParams();
    const {data, isLoading} = useQuery(`product_${params.id}`, async()=>{
        const res = await fetch(`http://127.0.0.1:9800/product/${params.id}`, { method: "GET" });
        return await res.json();
    });

    if(isLoading){
        return (<div><h1>Loading...</h1></div>);
    } else{
        return (<div>
            <h1>PRODUCT DETAILS</h1>
            <table className="table"> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>QUANTITY_PER_UNIT</th>
                        <th>UNIT_PRICE</th>
                        <th>UNITS_IN_STOCK</th>
                        <th>DISCONTINUED</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(product=> (
                            <tr>
                                <td>{product.product_id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.quantity_per_unit}</td>
                                <td>{product.unit_price}</td>
                                <td>{product.units_in_stock}</td>
                                <td>{product.discontinued == 1 ? 'YES' : 'NO'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>);
    }
}