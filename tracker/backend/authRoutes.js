const jwt=require('jsonwebtoken');
function auth(req,res,next){
    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token,authorization denied'});
    }

    try{
        const decoded=jwt.verify(token,'your_jwt_secret');//replace with your secret
        req.user=decorded.user;
        next();

    }catch(err){
        res.status(401).json({msg:'Token is not valid'});

    }
}
module.exports=auth;