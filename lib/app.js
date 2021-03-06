
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = module.exports = express();

var mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/../public/favicon.ico'));
// app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));
app.log = require(path.join(__dirname,'/utils/logger'))();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);
require('./routes/search')(app);

mongoose.connect(process.env.DATABASE || 'mongodb://localhost/pantry_pickup', function() {
  // TODO change log level to debug?
  app.log.info("Connected to the " + mongoose.connection.name + " MongoDB collection");
});

http.createServer(app).listen(app.get('port'), function(){
  app.log.info('Express server listening on port ' + app.get('port'));
});
