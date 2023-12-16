/* start timer */
$(document).on('click', '#countdown', function () {
    if (!$(this).hasClass('disable')) {
        $(this).addClass('disable');
        var timeleft = parseInt($('#countdown').text());
        window.timerCountdown = setInterval(function () {
        if (timeleft > 0) {
            animateCSS($('#countdown'), `pulse animate__fast`);
            if (timeleft < 6) {
            animateCSS($('#countdown'), `pulse animate__fast`);
            
            if (timeleft == 5) {
                document.getElementById('audio_timeup').play();
            }
            } else document.getElementById('audio_tiktok').play();
        } else {
            $('#countdown').removeClass('disable');
            document.getElementById('audio_tiktok').pause();
            document.getElementById('audio_tiktok').currentTime = 0;
            clearInterval(timerCountdown);
        }
        $('#countdown').text(timeleft);
            timeleft -= 1;
        }, 1000);
    }
    });
    
    /* start timer */
    $(document).on('click', '#countdown_media', function () {
        console.log('run timer media');
        if (!$(this).hasClass('disable')) {
            $(this).addClass('disable');
            var timeleft = parseInt($('#countdown_media').text());
            window.timerCountdown2 = setInterval(function () {
            if (timeleft > 0) {
                animateCSS($('#countdown_media'), `pulse animate__fast`);
                if (timeleft < 6) {
                animateCSS($('#countdown_media'), `pulse animate__fast`);
                
                if (timeleft == 5) {
                    document.getElementById('audio_timeup').play();
                }
                } else document.getElementById('audio_tiktok').play();
            } else {
                $('#countdown_media').removeClass('disable');
                document.getElementById('audio_tiktok').pause();
                document.getElementById('audio_tiktok').currentTime = 0;
                clearInterval(timerCountdown2);
            }
            $('#countdown_media').text(timeleft);
                timeleft -= 1;
            }, 1000);
        }
        });