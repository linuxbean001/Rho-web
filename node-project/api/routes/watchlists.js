const express =require('express');
const router =express.Router();
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
//--------- code for get watchlist details  usign Authorization  ----------------
router.post('/',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
    var options = { method: 'GET',
         url: apiBaseUrl+'watchlists',
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
router.post('/watchlists',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const id = req.body.id;
    var options = { method: 'GET',
         url: apiBaseUrl+'watchlists/'+id,
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' } ,
            formData:{id:id}
          
          };

     request(options, function (error, response, body) {
		if (error) throw new Error(error);
		     res.header("Access-Control-Allow-Origin", "*");
               res.status(200).json({
			     message:'success',
			     data:body,
               });
          });
});

router.post('/watchlistsAdd',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const name = req.body.name;
     const symbols =req.body.symbols;
    var options = { method: 'POST',
         url: apiBaseUrl+'watchlists',
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' },
            formData:{name:name,symbols:symbols} 
          };

          request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		      res.header("Access-Control-Allow-Origin", "*");
              res.status(200).json({
			         message:'success',
			         data:body,

				});
  
         });
    });
    router.post('/watchlistsUpdate',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const name = req.body.name;
     const symbols =req.body.symbols;
     const id=req.body.id;
    var options = { method: 'PUT',
         url: apiBaseUrl+'watchlists/'+id,
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' },
            formData:{id:id , name:name,symbols:symbols}
           };

          request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		      res.header("Access-Control-Allow-Origin", "*");
              res.status(200).json({
			         message:'success',
			         data:body,

				});
  
         });
    });
    router.post('/watchlistsDelete',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const id=req.body.id;
    var options = { method: 'DELETE',
         url: apiBaseUrl+'watchlists/'+id,
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' },
            formData:{id:id}
          };

          request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		      res.header("Access-Control-Allow-Origin", "*");
              res.status(200).json({
			         message:'success',
			         data:body,

				});
  
         });
    });
    router.post('/watchlistsAddSymbols',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const id=req.body.id;
     const symbols= req.body.symbols;
    var options = { method: 'POST',
         url: apiBaseUrl+'watchlists/'+ id +'/symbols',
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' },
            formData:{id:id , symbols:symbols}
          };

          request(options, function (error, response, body) {
		  if (error) throw new Error(error);
		      res.header("Access-Control-Allow-Origin", "*");
              res.status(200).json({
			         message:'success',
			         data:body,

				});
  
         });
    });
    router.post('/watchlistsRemoveSymbols',(req , res, next) =>{
     const AuthorizationCode = req.body.Authorization;
     const id=req.body.id;
     const symbol= req.body.symbol;
    var options = { method: 'DELETE',
         url: apiBaseUrl+'watchlists/'+ + '/symbols/'+ symbol ,
         headers: 
          { 'cache-control': 'no-cache',
          Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' },
            formData:{id:id , symbol:symbol} 
          };

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