import React from "react";
import { useParams } from "react-router-dom";

export function Product(){
    let params = useParams();
    return (<h1>Product {params.id}</h1>);
}