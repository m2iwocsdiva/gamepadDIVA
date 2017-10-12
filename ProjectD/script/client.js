// client.js

    var socket = io.connect(window.location.hostname + ':' + 3000);

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');

        socket.emit('rgb', {
            color: null,
            value: null
        });

        socket.on('rgb', function(data) {

            testinginput(32);

        });
    });