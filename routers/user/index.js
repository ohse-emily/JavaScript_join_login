const express = require('express');
const router = express.Router();
const userController = require('./user.controller')
const multer=require('multer');
const path = require('path');

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads/')
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf() + path.extname(file.originalname))
        }
    })
})

router.get('/join',userController.join);
router.post('/join_success', upload.single('img'),userController.join_success);
router.get('/login', userController.login);
router.post('/login_check', userController.login_check);
router.get('/logout', userController.logout);
router.get('/info', userController.info);
router.get('/userid_check', userController.userid_check);

module.exports=router;