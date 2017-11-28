var express = require('express');
var router = express.Router();

/* GET random number */
router.get('/randomNumber', function(req, res, next) {
	
	var randomNumber = Math.floor( Math.random() * 255) + 1;
	
	res.json({
		randomNumber
	});
});

/* GET random chart values */
router.get('/chartValues', function(req, res, next) {
	
	var randomChartNumbers = [];
	for(var i = 0; i < 52; i++) {
		randomChartNumbers.push( Math.floor( Math.random() * 255) + 1 );
	}
	
	res.json(
		randomChartNumbers
	);
});

/* GET random chart values */
router.get('/chartLineValues', function(req, res, next) {
	
	var randomChartLineNumbers = [];
	for(var i = 0; i < 400; i++) {
		randomChartLineNumbers.push( Math.floor( Math.random() * 255) + 1 );
	}
	
	res.json(
		randomChartLineNumbers
	);
});



module.exports = router;
