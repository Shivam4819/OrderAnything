const express = require('express');
const app = express()
const port = 3000

const {sqlconnection} = require('../database/sql_con')
require('./login_api')
require('./admin_api')(app)
const {insert_all_items, insert_final_order } = require('../database/sql_querry')

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

var orderId=0;

//place final order in table
app.post('/order', (req,res)=>{

    const {items, customerId, finalPrice} = req.body;
    orderId=3;
    const status="pending";
    const address="sec-20";

    let visitedCat = new Map();

    let response=true;
    const finalOrderStatus = insert_final_order(sqlconnection, customerId, finalPrice, status, orderId);
    if(finalOrderStatus){
        items.forEach(element => {
            const { itemId, categoryId, itemName, quantity,price} = element;
            sqlconnection.query(`select location from categoryLocation where catId = '${categoryId}'`,(err,rows,field)=>{
                if(!err){
                    // console.log(rows);
                    var random=Math.floor(Math.random()*rows.length);
                    const address = rows[random].location;
                    console.log("Address:", address);
                    const orderInsertStatus = insert_all_items(sqlconnection, itemId, orderId, itemName, quantity
                        , price, address)
    
                    if(orderInsertStatus){
                       response = true;
                    }else{
                        response = false;
                    }
                }
                else{
                    response = false;
                    console.log(err);
                }
            })
            
        })
    }
    res.send(response); 
})


//show menu to the user
app.get('/menu',(req,res)=>{
    sqlconnection.query('select * from menu ',(err,rows,field)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);

    })
    
})
module.exports = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})