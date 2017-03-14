var PriorityDistributionAlgo = require('./priorityDistributionAlgo');
module.exports = function (app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // frontend routes =========================================================


    app.post('/app/prioritydistribution', function (req, res) {


        var response = PriorityDistributionAlgo.calculate(req.body.dates, req.body.groupData);
        res.json(response);


    });


    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });


};