const express=require('express');
const {signup}=require('../Controllers/AuthController');
const { signupValidation } = require('../Middlewares/AuthValidation');
const router=express.Router();
router.post('/login',(req,res)=>{
    res.send('login successfull');
});

router.post('/signup',signupValidation,signup);
module.exports=router; 