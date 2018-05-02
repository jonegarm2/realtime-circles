var io = require('socket.io')();

var players = {};

io.on('connection', function (socket) {
    //new code below
    socket.on('add-circle', function (data) {
        io.emit('add-circle', data);
    });
    socket.on('clear-display', function () {
        io.emit('clear-display');
    });
    socket.on('disconnect', function () {
        delete players[socket.id];
        io.emit('update-player-list', Object.values(players));;
    });
    socket.on('register-player', function (initials) {
        players[socket.id] = initials;
        io.emit('uptdate-player-list', Object.values(players));
    });

});

module.exports = io;