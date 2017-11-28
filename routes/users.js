var express = require('express');
var router = express.Router();

/* GET users listing. */
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json([{
		id: 1,
		username: "Bernard Baker",
		callsign: "BrownFox"
	}]);
});

module.exports = router;
