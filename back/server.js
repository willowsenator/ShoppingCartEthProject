const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const PORT = 9800;

app.use(cors());

app.listen(PORT, ()=>{
    console.log("Listening in port: ", PORT);
});

app.get('/', (req, res)=>{
    res.status(200).send("<h1>BACKEND</h1>")
});

app.get('/ping',(req, res)=>{
    res.status(200).send({currentDate: Date()});
});

app.get('/products', async(req, res)=>{
        try{    
            const records = await db.query("select * from products", []);
            res.status(200).send(records);
        } catch(error){
            res.status(500).send({error});
        }
});

app.get('/product/:id', async(req, res)=>{
    try{   
        const record = await db.query("select * from products where product_id = $1", [req.params.id]);
        res.status(200).send(record);
    } catch(error){
        res.status(500).send({error});
    }
});