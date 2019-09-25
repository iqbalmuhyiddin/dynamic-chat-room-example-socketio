var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("join room", function(room) {
    socket.join(room);
  });

  socket.on("chat message", function({ roomID, msg }) {
    io.in(roomID).emit("chat message", msg);
  });
});

http.listen(port, function() {
  console.log("listening on *:" + port);
});
