import React from "react";
import { Link, Outlet } from "react-router-dom";
export function Home(){
    return (<div className="container">
            <div className="text-end border p-2">
                <Link className="mx-2" to="/cart">Cart</Link>
                <Link to="/products">Products</Link>
            </div>
            <div className="border p-3">
                <Outlet/>
            </div>
    </div>);
}