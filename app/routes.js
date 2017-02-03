module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests

    app.get('/app/prioritydistribution', function(req, res){

    	console.log(req);

    	console.log("It's working");

        res.end("hallo");

    });

    app.post('/app/prioritydistribution', function(req, res){

        console.log(req.body.token);

        console.log("It's working");

        res.end("hallo");

    });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});



};