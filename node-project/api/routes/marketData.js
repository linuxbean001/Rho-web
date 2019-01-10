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
//--------- code for get market data details  usign Authorization  ----------------
router.post('/',(req , res, next) =>{
const AuthorizationCode = req.body.Authorization;
const symbols = req.body.symbols;
var options = { method: 'GET',
    url: apiBaseUrl+'markets/quotes',
    headers: 
        { 'cache-control': 'no-cache',
            Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' } ,
            formData: { symbols: symbols }
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
router.post('/timesales',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const symbols = req.body.symbols;
    const interval= req.body.interval;
    const start= req.body.start;
    const end = req.body.end;
    var options = { method: 'GET',
    url: apiBaseUrl+'markets/timesales',
    headers: 
        { 'cache-control': 'no-cache',
            Authorization: 'Bearer '+ AuthorizationCode,
            Accept: 'application/json' } ,
            formData: { symbol: symbols , interval: interval , start:start , end:end}
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
router.post('/optionschains',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const symbol = req.body.symbol;
    const expiration= req.body.expiration;
    var options = { method: 'GET',
            url: apiBaseUrl+'markets/options/chains',
            headers: 
                { 'cache-control': 'no-cache',
                    Authorization: 'Bearer '+ AuthorizationCode,
                    Accept: 'application/json' } ,
                    formData: { symbol: symbol , expiration: expiration}
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
router.post('/optionstrikes',(req , res, next) =>{
                    const AuthorizationCode = req.body.Authorization;
                    const symbol = req.body.symbol;
                    const expiration= req.body.expiration;
                    var options = { method: 'GET',
                            url: apiBaseUrl+'markets/options/strikes',
                            headers: 
                                { 'cache-control': 'no-cache',
                                    Authorization: 'Bearer '+ AuthorizationCode,
                                    Accept: 'application/json' } ,
                                    formData: { symbol: symbol , expiration: expiration}
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
 router.post('/optionsexpirations',(req , res, next) =>{
                                    const AuthorizationCode = req.body.Authorization;
                                    const symbol = req.body.symbol;
                                    
                                    var options = { method: 'GET',
                                            url: apiBaseUrl+'markets/options/expirations',
                                            headers: 
                                                { 'cache-control': 'no-cache',
                                                    Authorization: 'Bearer '+ AuthorizationCode,
                                                    Accept: 'application/json' } ,
                                                    formData: { symbol: symbol }
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
router.post('/history',(req , res, next) =>{
    const AuthorizationCode = req.body.Authorization;
    const symbol = req.body.symbol;
    const interval= req.body.interval;
    const start= req.body.start;
    const end = req.body.end;
   // console.log('hello',interval);
    var options = { method: 'GET',
            url: apiBaseUrl+'markets/history',
            headers: 
                { 'cache-control': 'no-cache',
                    Authorization: 'Bearer '+ AuthorizationCode,
                    Accept: 'application/json' } ,
                    formData: { symbol: symbol , interval: interval , start:start , end:end}
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
router.post('/clock',(req , res, next) =>{
                    const AuthorizationCode = req.body.Authorization;
                    var options = { method: 'GET',
                            url: apiBaseUrl+'markets/clock',
                            headers: 
                                { 'cache-control': 'no-cache',
                                    Authorization: 'Bearer '+ AuthorizationCode,
                                    Accept: 'application/json' } ,
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
 router.post('/calendar',(req , res, next) =>{
                                    const AuthorizationCode = req.body.Authorization;
                                    const month = req.body.month;
                                    const year= req.body.year;
                                    var options = { method: 'GET',
                                            url: apiBaseUrl+'markets/calendar',
                                            headers: 
                                                { 'cache-control': 'no-cache',
                                                    Authorization: 'Bearer '+ AuthorizationCode,
                                                    Accept: 'application/json' } ,
                                                    formData: { month : month , year: year }
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
 router.post('/search',(req , res, next) =>{
                                                    const AuthorizationCode = req.body.Authorization;
                                                    const q = req.body.q;
                                                    var options = { method: 'GET',
                                                            url: apiBaseUrl+'markets/search',
                                                            headers: 
                                                                { 'cache-control': 'no-cache',
                                                                    Authorization: 'Bearer '+ AuthorizationCode,
                                                                    Accept: 'application/json' } ,
                                                                    formData: { q: q , indexes: 'true' }
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
router.post('/lookup',(req , res, next) =>
{
    const AuthorizationCode = req.body.Authorization;
    const q = req.body.q;
    const exchanges=req.body.exchanges;
    const type=req.body.types;
    var options = { method: 'GET',
            url: apiBaseUrl+'markets/lookup',
            headers: 
                { 'cache-control': 'no-cache',
                    Authorization: 'Bearer '+ AuthorizationCode,
                    Accept: 'application/json' } ,
                    formData: { q: q , exchanges : exchanges  }
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