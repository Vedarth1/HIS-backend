const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');

router.use(express.json());

router.post('/send-otp',userController.sendotp);
router.post('/verify-otp',userController.verifyotp);
router.get('/sendlocation',userController.whatsappcurrentlocation);
module.exports=router;