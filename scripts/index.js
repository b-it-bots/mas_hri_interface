$(document).ready(function() {

    // var roomName = localStorage.getItem("room_name");
    if (localStorage.getItem("room_name")) {
        roomName = localStorage.getItem("room_name");
        // localStorage.clear();
    }
    var domain = "meet.jit.si"
    var options = {
        roomName: roomName,
        // width: 800,
        // heigth: 600,
        parentNode: document.querySelector('#jitsi_video')
    }
    var api = new JitsiMeetExternalAPI(domain, options);

});

var keys = {};
var keysOfInterest = [37, 38, 39, 40];
$(document).keydown(function (e) {
    keys[e.which] = true;
    console.log(keys)

    publishKeys();

});

function recognized_speech() {
    recognized_speech = "";

    var pressedKeysMsg = new ROSLIB.Message({
                        data : recognized_speech
                       });

}

function printKeys() {
    var html = '';
    for (var i in keys) {
        if (!keys.hasOwnProperty(i)) continue;
        html += '<p>' + i + '</p>';

    }
    $('#key_press').html(html);
}

var ros = new ROSLIB.Ros({
    url: "ws://localhost:9090"
})

ros.on("connection", function() {
    console.log("Connection to websocket server established.")
})

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

var listener_subscriber = new ROSLIB.Topic({
    ros : ros,
    name : "/speech_recognizer",
    messageType : "std_msgs/String"
});

listener_subscriber.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    localStorage.setItem("speech", message.data);
    location.reload();
    var go_2019_speech_recognizer = document.querySelector("#go_2019_speech_recognizer")
    go_2019_speech_recognizer.value = message.data
});
