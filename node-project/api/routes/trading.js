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
//--------- code for get trading preview Order  ----------------
 
router.post('/previewOrder',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const account_id = req.body.account_id;
    const symbol = req.body.formData.Symbol;
    const type = req.body.formData.Type;
    const quantity = parseInt(req.body.formData.Quantity);
    const stop = parseInt(req.body.formData.StopPrice);
    const limit = parseInt(req.body.formData.LimitPrice);
    const duration = req.body.formData.Duration;
    const classData = req.body.formData.Class;
    const side = req.body.formData.Side;
    var  option_symbol = '';
    if(classData==='option'){
         option_symbol = symbol;
    }
var options = { method: 'POST',
  url: apiBaseUrl+'accounts/'+account_id+'/orders',
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{ side : side , symbol : symbol , type : type , quantity:quantity , stop : stop , price : limit ,duration : duration , class : classData ,  preview:'true' ,option_symbol:option_symbol } 
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
//--------- code for get trading create Order  ----------------
 
router.post('/Order',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const account_id = req.body.account_id;
    const symbol = req.body.formData.Symbol;
    const type = req.body.formData.Type;
    const quantity = parseInt(req.body.formData.Quantity);
    const stop = parseInt(req.body.formData.StopPrice);
    const limit = parseInt(req.body.formData.LimitPrice);
    const duration = req.body.formData.Duration;
    const classData = req.body.formData.Class;
    const side = req.body.formData.Side;
    var  option_symbol = '';
    if(classData==='option'){
         option_symbol = symbol;
    }
var options = { method: 'POST',
  url: apiBaseUrl+'accounts/'+account_id+'/orders',
  headers: 
   { 'cache-control': 'no-cache',
      Authorization: 'Bearer '+ AuthorizationCode,
     'Content-Type': 'application/x-www-form-urlencoded',
     Accept: 'application/json' },
     form:{ side : side , symbol : symbol , type : type , quantity:quantity , stop : stop , price : limit ,duration : duration , class : classData ,option_symbol:option_symbol } 
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