const express = require('express');
const {sqlconnection} = require('../database/sql_con')
module.exports = (app) => {

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


    //admin can see all order
    app.get('/details',(req, res) => {
        sqlconnection.query('select FinalOrder.orderId,FinalItems.itemId,FinalItems.itemName,\
        FinalItems.quantity,FinalItems.price,FinalOrder.customerId,FinalOrder.status,\
        FinalItems.address from FinalOrder Inner join \
        FinalItems on FinalOrder.orderId=FinalItems.orderId;',(err,rows,field)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);
    
        })

    });

    //admin can see all delivery boys details
    app.get('/getdelivery', (req, res) => {
        sqlconnection.query('select * from deliveryBoy ',(err,rows,field)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);
    
        })
    });

    //admin can allocate order to a delivery boy
    app.post('/assign',(req, res) => {
            const {orderid, boyId} = req.body;
            const task="assigned";
            sqlconnection.query(`select status from deliveryBoy where boyId='${boyId}'`,(err,rows,field)=>{
                if(!err){
                    console.log("Status:", rows[0].status);
                    if(rows[0].status === "idle"){
                        sqlconnection.query(`update deliveryBoy set status='${task}',orderId='${orderid}' where boyId='${boyId}'`,(err,rows,field)=>{
                            if(!err){
                                sqlconnection.query(`update FinalOrder set status='${task}' where orderId='${orderid}'`,(err,rows,field)=>{
                                    if(!err){
                                        
                                        console.log("update done");
                                    }
                                    else
                                        console.log(err);
                            
                                })
                                
                            }
                            else
                                console.log(err);
                    
                        })
                    }
                    
                    res.send(rows);
                }
                else
                console.log(err);
        
            })

    });



    //admin can reset delivery boy status once task is done
    app.post('/free',(req, res) => {
        const {boyId} = req.body;
        const orderid=0;
        const task="idle";
        sqlconnection.query(`select status from deliveryBoy where boyId='${boyId}'`,(err,rows,field)=>{
            if(!err){
                console.log("Status:", rows[0].status);
                if(rows[0].status === "assigned"){
                    sqlconnection.query(`update deliveryBoy set status='${task}',orderId='${orderid}' where boyId='${boyId}'`,(err,rows,field)=>{
                        if(!err){
                            console.log("update done");
                        }
                        else
                            console.log(err);
                
                    })
                }
                
                res.send(rows);
            }
            else
            console.log(err);
    
        })

});


 
    //delivery boy can update status of  the order
    app.post('/update', (req, res) => {
            const {orderId,status}=req.body;
            sqlconnection.query(`update FinalOrder set status='${status}'where orderId='${orderId}'`,(err,rows,field)=>{
                if(!err){
                    console.log("update done");
                    res.send(rows);
                }
                else
                    console.log(err);
        
            })
    });

    //delivery boy can see all the items inside the order assigned to him
    app.post('/items',(req, res) => {

        const {boyId}= req.body;
        sqlconnection.query(`select orderId from deliveryBoy where boyId='${boyId}'`,(err,rows,field)=>{
            if(!err){
                sqlconnection.query(`select * from FinalItems where orderId='${rows[0].orderId}'`,(err,rows,field)=>{
                    if(!err){
                        res.send(rows);
                    }
                    else
                    console.log(err);
            
                })
            }
            else
            console.log(err);
    
        })
    });
}