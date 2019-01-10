const express =require('express');
const router =express.Router();
var Curl = require( 'node-libcurl' ).Curl;
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(cors())
const configApi = require('../../apiconfig.json');
var apiBaseUrl= configApi.apiurl;
if(configApi.isSendBox){
    apiBaseUrl=configApi.sendBoxurl;
    console.log('sendbox is working');
}

//--------- code for get user details  usign Authorization code---
router.post('/',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     var curl = new Curl();
     var options = { method: 'GET',
         url: apiBaseUrl+'user/profile',
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' } };

          request(options, function (error, response, body) {
		  if (error) throw new Error(error);
              res.header("Access-Control-Allow-Origin", "*");
              //console.log('AuthorizationCode',body);
              res.status(200).json({
			         message:'success',
			         data:body,

				});
  
         });
    });

    //--------- code for get user order details usign Authorization code---
    router.post('/order',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'user/orders',
            headers: 
             { 'cache-control': 'no-cache',
             Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
   
             request(options, function (error, response, body) {
             if (error) throw new Error(error);
                 res.header("Access-Control-Allow-Origin", "*");
                 res.status(200).json({
                        message:'success',
                        data:body,
   
                   });
     
            });
     });

       //--------- code for get user balances details usign Authorization code---

       router.post('/balances',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'user/balances',
            headers: 
             { 'cache-control': 'no-cache',
               Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
   
             request(options, function (error, response, body) {
             if (error) throw new Error(error);
                 res.header("Access-Control-Allow-Origin", "*");
                 res.status(200).json({
                        message:'success',
                        data:body,
   
                   });
     
            });
        });
         //--------- code for get user positions details usign Authorization code---

       router.post('/positions',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'user/positions',
            headers: 
             { 'cache-control': 'no-cache',
               Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
   
             request(options, function (error, response, body) {
             if (error) throw new Error(error);
                 res.header("Access-Control-Allow-Origin", "*");
                 res.status(200).json({
                        message:'success',
                        data:body,
   
                   });
     
            });
        });
          //--------- code for get user history details usign Authorization code---

       router.post('/history',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'user/history',
            headers: 
             { 'cache-control': 'no-cache',
               Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
   
             request(options, function (error, response, body) {
             if (error) throw new Error(error);
                 res.header("Access-Control-Allow-Origin", "*");
                 res.status(200).json({
                        message:'success',
                        data:body,
   
                   });
     
            });
        });
          //--------- code for get user history details usign Authorization code---

       router.post('/history',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
       var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'user/history',
            headers: 
             { 'cache-control': 'no-cache',
               Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
   
             request(options, function (error, response, body) {
             if (error) throw new Error(error);
                 res.header("Access-Control-Allow-Origin", "*");
                 res.status(200).json({
                        message:'success',
                        data:body,
   
                   });
     
            });
        });
       //--------- code for get user history details usign Authorization code---

       router.post('/gainloss',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'user/gainloss',
            headers: 
             { 'cache-control': 'no-cache',
               Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
   
             request(options, function (error, response, body) {
             if (error) throw new Error(error);
                 res.header("Access-Control-Allow-Origin", "*");
                 res.status(200).json({
                        message:'success',
                        data:body,
   
                   });
     
            });
        });
        
        
        

module.exports=router;