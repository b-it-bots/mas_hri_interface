$(document).ready(function() {

    // var roomName = localStorage.getItem("room_name");
    // if (localStorage.getItem("speech")) {
    //     speech = localStorage.getItem("speech");
    //     // localStorage.clear();
    // }


});

function recognized_speech() {
    recognized_speech = "";

    var speech = new ROSLIB.Message({
                        data : recognized_speech
                       });
}

var ros = new ROSLIB.Ros({
    url: "ws://10.18.1.10:9090"
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
    console.log('Received message on ' + listener_subscriber.name + ': ' + message.data);
    localStorage.setItem("speech", message.data);
    location.reload();
    var go_2019_speech_recognizer = document.getElementById("#go_2019_speech_recognizer")
    go_2019_speech_recognizer.value = message.data
});
