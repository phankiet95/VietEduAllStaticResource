window.countdownTotal = 20;
window.countdownRemain = 20;
window.countdownObject = '';
window.countdownProgressObject = '#questionProgressBar';

var intervalID;
//intervalID = setInterval(countdownFunction, 100);

function countdownFunction() {
    window.countdownRemain = window.countdownRemain - 0.1;
    //$(window.countdownObject).html(window.countdownRemain);
    let percent = countdownRemain/countdownTotal * 100;
    $(window.countdownProgressObject).width(percent+ '%');
    if (percent < 0) {
        clearInterval(intervalID);
    }
    //console.log(percent);
}

/* start timer */
$(document).on('click', '#countdownWrap', function () {
if (!$(this).hasClass('disable')) {
    $(this).addClass('disable');
    var timeleft = parseInt($('#countdown').text());
    window.timerCountdown = setInterval(function () {
    if (timeleft > 0) {
        animateCSS($('#countdownWrap'), `pulse animate__fast`);
        if (timeleft < 6) {
        animateCSS($('#countdown'), `pulse animate__fast`);

        
        if (timeleft == 5) {
            document.getElementById('audio_timeup').play();
        }
        } else document.getElementById('audio_tiktok').play();
    } else {
        $('#countdownWrap').removeClass('disable');
        document.getElementById('audio_tiktok').pause();
        document.getElementById('audio_tiktok').currentTime = 0;
        clearInterval(timerCountdown);
    }
    $('#countdown').text(timeleft);
        timeleft -= 1;
    }, 1000);
}
});