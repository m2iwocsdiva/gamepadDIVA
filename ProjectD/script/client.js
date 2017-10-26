// client.js

    //var socket = io.connect(window.location.hostname + ':' + 3000);
    var socket = io.connect("http://localhost:3000");	

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected!');

        socket.emit('rgb', {
            color: null,
            value: null
        });

        socket.emit('Jgauche', {
            color: null,
            value: null
        });

        socket.emit('Jdroite', {
            color: null,
            value: null
        });

        socket.emit('Jhaut', {
            color: null,
            value: null
        });

        socket.emit('Jbas', {
            color: null,
            value: null
        });

        socket.on('rgb', function(data) {

            testinginput(32);

        });

        socket.on('Jhaut', function(data) {

            testinginput(90);

        });

        socket.on('Jbas', function(data) {

            testinginput(83);

        });

        socket.on('Jgauche', function(data) {

            testinginput(81);

        });

        socket.on('Jdroite', function(data) {

            testinginput(68);

        });
    });
