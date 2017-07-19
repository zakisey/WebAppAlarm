var player;
var timerHour;
var timerMinute;
var timerSecond;
var timer;

var userVideoId;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: userVideoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function timerFunc() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    if (h == timerHour && m == timerMinute && s == timerSecond) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        clearInterval(timer);
    }
}

function getIdFromUrl(url) {
    var pos = url.search("v=");
    var id = url.slice(pos + 2, pos + 13);
    console.log(id);

    return id;
}

$(document).ready(function() {
    $("#buttonSet").click(function () {
        timerHour = $("#inputHour").val();
        timerMinute = $("#inputMinute").val();
        timerSecond = $("#inputSecond").val();
        timer = setInterval(timerFunc, 1000);
        userVideoId = getIdFromUrl($("#inputUrl").val());
    });
});