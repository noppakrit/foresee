// Generated by CoffeeScript 1.4.0
var getSocketUrl, route;

var core = require("./core").core;

getSocketUrl = function(req) {
  return "http://" + req.headers.host;
};

route = {
  index: function(req, res) {
    return res.render('index.ect', {
      title: "Foresee"
    });
  },
  join: function(req, res) {
    return res.render('join.ect', {
      id: req.params.id,
      socketUrl: getSocketUrl(req)
    });
  },
  addStory: function(req, res) {
    core.addStory(req.params.room, req.params.story);
    res.send(core.listStories(req.params.room));
  },
  listStories: function(req, res) {
    res.send(core.listStories(req.params.room));
  },
  addParticipant: function(req, res) {
    core.addParticipant(req.params.room, req.params.name);
    return res.json({
      room: req.params.room,
      name: req.params.name
    });
  },
  joinRoom: function(websocket) {
    return function(req, res) {
      core.addParticipant(req.params.room, req.params.name);

      var room = core.getRoom( req.params.room );
      websocket.sendRefreshMessage(req.params.room);
      return res.json({
        room: req.params.room,
        name: req.params.name,
        state: room.state
      });
    }
  }
};

exports.route = route;
