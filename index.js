var exec = require("child_process").exec;
var path = require("path");
var mongo_log = path.join(__dirname, "logs", "mongodb.log");
var mongo_start = "mongod --fork --logpath " + mongo_log;
var mongo_stop = "mongo --eval \"db.getSiblingDB('admin').shutdownServer()\"";

exec(mongo_start, function(error, stdout, stderr) {
  //if (error) throw error;

  var repl = require("repl");
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/signifigance');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {

    var memorySchema = mongoose.Schema({
      date: {
        type: Date,
        default: Date.now
      },
      text: String
    });
    var Memory = mongoose.model('memory', memorySchema);

    var r = repl.start({
      ignoreUndefined: true,
      prompt: "> ",
      eval: function(text, context, filename, callback) {
        text = text.replace(/^\(|\)$|\n/ig, "");
        var memory = new Memory({
          text: text
        }).save(function(err, memory) {
          if (err) throw err;
          return callback(null, "ok");
        });
      }
    });

    r.on('exit', function() {
      mongoose.connection.close();
      exec(mongo_stop, function(error, stdout, stderr) {
        if (error) throw error;
        process.exit();
      });
    });

  });
});