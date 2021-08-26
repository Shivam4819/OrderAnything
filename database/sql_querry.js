

function insert_final_order(sqlconnection, customerId, finalPrice, status, orderId){
    try {
        const { err, rows, field} = sqlconnection.query(`insert into FinalOrder values('${orderId}','${customerId}','${status}','${finalPrice}')`)
        if(!err){
            return true;
        }
        return false
    } catch (error) {
        console.log("Db Error:", error);
        return false
    }
}


function insert_all_items(sqlconnection, itemId, orderId, itemName, quantity,price, address){
    try {
        const { err, rows, field} =  sqlconnection.query(`insert into FinalItems values('${orderId}','${itemId}','${itemName}','${quantity}','${price}','${address}')`)
        if(!err) {
            console.log("Done3");
            return true;
        }
        else{
            console.log("Db Error3:", err);
            return false;
        }
    } catch (error) {
        console.log("Db Error:", error);
        return false
    }
}

module.exports = {
    insert_final_order, 
    insert_all_items
}