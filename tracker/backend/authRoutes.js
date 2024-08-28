const jwt=require('jsonwebtoken');
function auth(req,res,next){
    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No token,authorization denied'});
    }

    try{
        const decoded=jwt.verify(token,'377df94e4f43fe959fa8cf5af65aaadf1cbaa9b2e214bb4e0c165c257933ab81b11c1adbf5a6b4e7622253d2e7f1c440de86c8ba098a483cb9dc525eb7a8b9b6');//replace with your secret
        req.user=decorded.user;
        next();

    }catch(err){
        res.status(401).json({msg:'Token is not valid'});

    }
}
module.exports=auth;