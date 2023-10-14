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
        </div>);
    }
}