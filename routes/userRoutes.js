const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const medicalinfocontroller=require('../controller/medicalinfo')

router.use(express.json());

router.post('/send-otp',userController.sendotp);
router.post('/verify-otp',userController.verifyotp);
router.get('/sendlocation',userController.whatsappcurrentlocation);
router.post('/medicalinfo',medicalinfocontroller.info);
module.exports=router;