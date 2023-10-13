import React from "react";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";

export function Products() {
    const {data, isLoading} = useQuery("products", async ()=>{
        const res = await fetch("http://127.0.0.1:9800/products", { method: "GET" });
        return await res.json();
    });

    if(isLoading){
        return (<div><h1>Loading...</h1></div>);
    } else{
        return (
            <div>
                <h1>Products</h1>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Name</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(product => (
                            <tr key={product.product_id}>
                                <td><Link to={`/product/${product.product_id}`}>{product.product_name}</Link></td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            );
    }
}