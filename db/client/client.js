var WS = require("ws");
var prettyjson = require("prettyjson");
var sqllite3 = require("sqlite3").verbose();
var db = new sqllite3.Database("../development.sqlite3");
ws = new WS("ws://aoe2.net/ws");

var run = function () {
  console.log("Starting/Restarting ... ");
  ws.close();
  ws = new WS("ws://aoe2.net/ws");
  ws.on('open', function () {
    ws.send(JSON.stringify({message: "subscribe", subscribe: [221380]}));
  });
  var players = [];

  ws.on("message", function (data, flags) {
    parsed = JSON.parse(data);
    lobbies = parsed.lobbies;

    if (!lobbies) {
      return;
    }

    db.serialize(function () {
      for (var iter = 0; iter < lobbies.length; iter++) {
        var current = lobbies[iter];
        for (var j in current.players) {
          if (current.players[j] === null) {
            continue;
          }
          (function (curPlayer) {

            curPlayer.last_seen = Math.ceil((new Date()).getTime() / 1000);
            curPlayer.name = decodeURI(curPlayer.name);
            var query = "INSERT INTO players (steam_id, last_seen, elo, country, name, created_at, updated_at) VALUES ('" + curPlayer.id + "', " + curPlayer.last_seen + ", " + curPlayer.elo + ", '" + curPlayer.country + "', '" + curPlayer.name + "', '" + curPlayer.last_seen + "', '" + curPlayer.last_seen + "');";
            db.run(query, function (error) {
              if (error) {
                return;
              }
              console.log(curPlayer.name + " inserted");
            });

          })(current.players[j]);
        }
      }
    });
  });

};

run();
setInterval(run, 300000);

