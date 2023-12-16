$(document).ready(function () {
  $('#questionOpenPanelWrapper').hide();
  /* get data from html file and put it in to slideData variable */
  typeof slideData == 'undefined' && (window.slideData = JSON.parse($('#slideDataTxt').text()));
  $('#qInfo').css('font-family', slideData.font.fontFamily);
  $('.countdown').text(slideData.setting.countdown.second);

  /* display a character on click */
  $(document).on('click', '#slidePage .input-group-text:not(.rejected)', function () {
    $(this).children().toggleClass('show');
  });

  function previewMedia(type, src) {
    switch (type) {
      case 'video':
        $('#questionMedia_video').attr('src', 'data:video/mp4;base64,' + src);
        $('#questionMedia_video').removeClass('d-none');
        break;
      case 'audio':
        $('#questionMedia_audio').attr('src', 'data:audio/mpeg;base64,' + src);
        $('#questionMedia_audio').removeClass('d-none');
        break;
      case 'image':
        $('#questionMedia_img').attr('src', 'data:image/gif;base64,' + src);
        $('#questionMedia_img').removeClass('d-none');
        type = 'img';
        break;
      default:
        break;
    }
  }
  var isNavigationBarShowed = $('#horizontalNavigation').is(":visible");

  /* handle on click on question's number */
  $(document).on('click', '#slidePage .qNo', function () {

    typeof $('#slideWrapPage').attr('questionid') == 'undefined' && document.getElementById('audio_select').play();
    if (typeof $('#slideWrapPage').attr('questionid') != 'undefined' && $(this).parents('.slideItem').index() != $('#questionText').attr('questionid')) {

      document.getElementById('audio_select').play();
    }

    $('#slideWrapPage').attr('questionid', $(this).parents('.slideItem').index());
    let data = slideData.data[$(this).parents('.slideItem').index()];

    // If Question is Text 
    if (data.file == '' || data.file == null) {
      $('.questionText').html(data.question);
      $('#TextQuestion_Wrapper').show();
      return;
    }

    if (isNavigationBarShowed) {
      $('#horizontalNavigation').hide();
    }


    jQuery('#questionOpenPanelWrapper').toggle('slide', {direction: 'left'}, 500);

    // Load media
    // Reduce lag time when loading media
    setTimeout(() => {
      $('#TextShowSpan').addClass('showTop3');
    if (data.file) {
      previewMedia(data.file.type, data.file.base64);
      // If Question has media, then text span will be shown at the bottom
      $('#TextShowSpan').removeClass('showTop3');
    }

    $('.questionText').html(data.question);


    }, 500);

  });

  // Close TextQuestion 
  $(document).on('click', '#TextQuestion_Close', function () {
    closeTextQuestion();
  });

  function closeTextQuestion() {
    $('#TextQuestion_Wrapper').hide();
    if (window.timerCountdown != undefined && window.timerCountdown != 'undefined') {
      window.clearInterval(timerCountdown);
      $('#countdown').removeClass('disable');
      document.getElementById('audio_tiktok').pause();
      document.getElementById('audio_tiktok').currentTime = 0;
      document.getElementById('audio_timeup').pause();
      document.getElementById('audio_timeup').currentTime = 0;
    }
    $('.countdown').text(slideData.setting.countdown.second);
    $('#backgroundSound')
      .children()
      .each(function (index, el) {
        el.pause();
        el.currentTime = 0;
      });
  }

  /* Text Question handle on click choose correct or incorrect answer */

  $(document).on('click', '.TextQuestion_Right', function () {
    closeTextQuestion();
    $('#slidePage .slideItem').eq($('#slideWrapPage').attr('questionid')).children(':not(.qNo)').children().addClass('show');
    document.getElementById('audio_correct').play();
  });

  $(document).on('click', '.TextQuestion_Wrong', function () {
    closeTextQuestion();
    $('#slidePage .slideItem').eq($('#slideWrapPage').attr('questionid')).children(':not(.qNo)').addClass('rejected');
    document.getElementById('audio_incorrect').play();
  });


  function closeQuestionWrap(option) {
    jQuery('#questionOpenPanelWrapper').toggle('slide', {direction: 'left'}, 500);

    // destroy all media
    $('#questionMedia_video').attr('src', '');
    $('#questionMedia_video').addClass('d-none');
    $('#questionMedia_audio').attr('src', '');
    $('#questionMedia_audio').addClass('d-none');
    $('#questionMedia_img').attr('src', '');
    $('#questionMedia_img').addClass('d-none');

    if (window.timerCountdown2 != undefined && window.timerCountdown2 != 'undefined') {
      window.clearInterval(timerCountdown2);
      $('#countdown_media').removeClass('disable');
      document.getElementById('audio_tiktok').pause();
      document.getElementById('audio_tiktok').currentTime = 0;
      document.getElementById('audio_timeup').pause();
      document.getElementById('audio_timeup').currentTime = 0;
    }
    $('.countdown').text(slideData.setting.countdown.second);
    $('#backgroundSound')
      .children()
      .each(function (index, el) {
        el.pause();
        el.currentTime = 0;
      });

    if (isNavigationBarShowed) {
      $('#horizontalNavigation').show();
    }
  }



  /* handle on click choose correct or incorrect answer */

  $(document).on('click', '#answerJudge .tick', function () {
    closeQuestionWrap();
    $('#slidePage .slideItem').eq($('#slideWrapPage').attr('questionid')).children(':not(.qNo)').children().addClass('show');
    document.getElementById('audio_correct').play();
  });
  
  $(document).on('click', '#answerJudge .reject', function () {
    closeQuestionWrap();
    $('#slidePage .slideItem').eq($('#slideWrapPage').attr('questionid')).children(':not(.qNo)').addClass('rejected');
    document.getElementById('audio_incorrect').play();
  });

  /* handle on click choose correct or incorrect answer */
  $(document).on('click', '#questionClose', function () {
    closeQuestionWrap();
  });
  
});
