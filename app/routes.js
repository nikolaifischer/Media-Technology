var PriorityDistributionAlgo = require('./priorityDistributionAlgo');
module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

    app.get('/app/prioritydistribution', function(req, res){

    	console.log(req);



        res.end("hallo");

    });

    app.post('/app/prioritydistribution', function(req, res){

        console.log(req.body);

        res.end(PriorityDistributionAlgo.calculate(req.body.dates,req.body.groupData));



    });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});



};