const jwt= require('jsonwebtoken');
const {generatetoken, verifytoken}= require('./jwt_token')

module.exports = (app) => {

    
   
    //get all registered users
    app.get('/getuser',(req,res)=>{
        sqlconnection.query('select userid ,phone from Login',(err,rows,field)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);

        })
    })

    //register user
    app.post('/register',(req,res)=>{
        sqlconnection.query(`insert into Login values('${req.body.userid}','${req.body.phone}','${req.body.password}')`,(err,rows,field)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);

        })
    });

    //login user
    //jwt token function are created in jwt_token.js file, needs to be integrated
    app.post('/login',(req,res)=>{
        sqlconnection.query(`select password from Login where phone='${req.body.phone}')`,(err,rows,field)=>{
            if(!err)
            res.send(rows);
            else
            console.log(err);

        })
    });
}