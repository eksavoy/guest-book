// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var mongoAddress = process.env.MONGO_ADDRESS || 'localhost:27017/guestBook';

var mongoose   = require('mongoose');
mongoose.connect('mongodb://'+mongoAddress); // connect to our database

var Guest = require('./app/models/message');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log(req.method + ' ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ result: 'Welcome to our api!' });
});

// more routes for our API will happen here

router.route('/guests')
  .post(function(req, res){
    var guest = new Guest();
    guest.message = req.body.message;
    guest.author = req.body.author;

    guest.save(function(err){
      if(err){
        console.error(err);
        res.send(err);
      }
      res.json({result: 'Guest created'});
    });
  })
  .get(function(req, res){
    Guest.find(function(err, guests){
      if(err){
        console.error(err);
        res.send(err);
      }
      res.json(guests);
    });
  });

router.route('/guests/:guest_id')
  .get(function(req, res){
    Guest.findById(req.params.guest_id, function(err, guest){
      if(err){
        console.error(err);
        res.send(err);
      }
      res.json(guest);
    });
  })
  .put(function(req, res){
    Guest.findById(req.params.guest_id, function(err, guest){
      if(err){
        console.error(err);
        res.send(err);
      }
      guest.message = req.body.message;
      guest.author = req.body.author;

      guest.save(function (err) {
        if(err){
          console.error(err);
          res.send(err);
        }
        res.json({result: 'Guest updated'});
      });
    });
  })
  .delete(function (req, res) {
    Guest.remove({
      _id: req.params.guest_id
      }, function(err){
        if(err){
          console.error(err);
          res.send(err);
        }
        res.json({result: 'Guest deleted'})
    });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
