const jwt= require('jsonwebtoken');


//this function generates a jwt Token
function generatetoken(phone,password){
    const token=jwt.sign({phone,password},'mysecret');
        return token;
    
}

//this function verify a token
function verifytoken(token){
    try{
        jwt.verify(token,'mysecret')
        return true;
    }catch(err){
        console.log(err);    
        return false;
    }
}

module.exports={
    generatetoken,
    verifytoken
}