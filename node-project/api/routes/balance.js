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
}
//--------- code for get account balance details  usign Authorization and userid code---
router.post('/',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const acc_id = req.body.acc_id;
     var curl = new Curl();
     var options = { method: 'GET',
         url: apiBaseUrl+'accounts/'+ acc_id +'/balances',
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

    router.post('/positions',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        const acc_id = req.body.acc_id;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'accounts/'+ acc_id +'/positions',
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
       router.post('/history',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        const acc_id = req.body.acc_id;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'accounts/'+ acc_id +'/history',
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
       router.post('/gainloss',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        const acc_id = req.body.acc_id;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'accounts/'+ acc_id +'/gainloss',
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
       router.post('/orders',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        const acc_id = req.body.acc_id;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'accounts/'+ acc_id +'/orders',
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
       router.post('/ordersStatus',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        const acc_id = req.body.acc_id;
        const ord_id = req.body.ord_id;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'accounts/'+ acc_id +'/orders/'+ ord_id,
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

       router.post('/positionsWithGain',(req , res, next) =>{
        const AuthorizationCode = req.body.Authorization;
        const acc_id = req.body.acc_id;
        var curl = new Curl();
        var options = { method: 'GET',
            url: apiBaseUrl+'accounts/'+ acc_id +'/positions',
            headers: 
             { 'cache-control': 'no-cache',
             Authorization: 'Bearer '+ AuthorizationCode,
               Accept: 'application/json' } };
                   
             request(options, function (error, response, body) {
             

                //*********************************************** */
               var str='';
               var obj = JSON.parse(body);
               if(obj && obj.positions){
                 obj.positions.position.forEach(function(item) {
                    str= str + item.symbol + ',';
                  });
               }
              
               var options2 = { method: 'GET',
                    url: apiBaseUrl+'markets/quotes',
                    headers: 
                        { 'cache-control': 'no-cache',
                            Authorization: 'Bearer '+ AuthorizationCode,
                            Accept: 'application/json' } ,
                            formData: { symbols: str }
                        };
                            request(options2, function (error, response, body) {
                                if (error) throw new Error(error);
                                    res.header("Access-Control-Allow-Origin", "*");
                                    res.status(200).json({
                                            message:'success',
                                            data:body,
                                            data2:obj
                                        });

                                });
                            });

                //*********************************************** */
                
      }); 
        
        

module.exports=router;