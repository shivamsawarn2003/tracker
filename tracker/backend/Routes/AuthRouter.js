const express=require('express');
const router=express.Router();
router.post('/login',(req,res)=>{
    res.send('login successfull');
});

router.post('/signup',(req,res)=>{
    res.send('signup successfull');
})
module.exports=router;