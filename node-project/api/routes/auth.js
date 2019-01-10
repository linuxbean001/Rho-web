const express =require('express');
const router =express.Router();
const http = require('http');
var Curl = require( 'node-libcurl' ).Curl;
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use(cors())
const baseurl="https://api.tradier.com/v1/";


//--------- code for get auth code usign code---
router.post('/',(req , res, next) =>{
	 const code = req.body.code;
     var curl = new Curl();
     var options = { method: 'POST',
		  url: 'https://api.tradier.com/v1/oauth/accesstoken',
		  headers: 
				   { Authorization: 'Basic VlZ4eFhaeHU4eTdhc0p6eEI0TEdIRE8yemV0MGZqakc6R1FVSGU3Q2c3ZUdBZlZEYw==',
				     'Content-Type': 'application/x-www-form-urlencoded'
				    },
		  form: 
				   { code: code,
				     grant_type: 'authorization_code',
				    }
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