const mysql=require('mysql');

const sqlconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'shivam',
    database:'kilobyte',
    multipleStatements:true

});


sqlconnection.connect((err)=>{
    if(!err){
        console.log("connection done");
    }
    else{
        console.log("connection failed:"+JSON.stringify(err,undefined,2));
    }
});

module.exports = {
    sqlconnection
};