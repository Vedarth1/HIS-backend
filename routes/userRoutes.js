const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const medicalinfocontroller=require('../controller/medicalinfo');
const {Contact}=require("../controller/getcontactinfo");
const {addcontact}=require("../controller/addcontact");
const {getMedicalInfo}=require("../controller/getmedicalinfo");
const {editMedicalInfo}=require("../controller/editinfo")

router.use(express.json());

router.post('/send-otp',userController.sendotp);
router.post('/verify-otp',userController.verifyotp);
// router.get('/sendlocation',userController.whatsappcurrentlocation);
router.post('/medicalinfo',medicalinfocontroller.info);
router.get('/getcontacts',Contact);
router.post('/addcontact',addcontact);
router.get('/displaymedicalinfo',getMedicalInfo);
router.post('/editinfo',editMedicalInfo)
module.exports=router;