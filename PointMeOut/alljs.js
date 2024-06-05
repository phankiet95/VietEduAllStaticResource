/* timer.js */
$(document).ready(function () { const data = {}; window.timerInit = (selector, seconds = null) => { data[`${selector}`] = { started: false, inteval: null }; $(`#${selector}.timer_container`).children('ul').length <= 0 && $(`#${selector}.timer_container`).append('<ul class="flip minutePlay"> <li class="before"> <a href="#"> <div class="up"> <div class="shadow"></div> <div class="inn"></div> </div> <div class="down"> <div class="shadow"></div> <div class="inn"></div> </div> </a> </li> <li class="active"> <a href="#"> <div class="up"> <div class="shadow"></div> <div class="inn"></div> </div> <div class="down"> <div class="shadow"></div> <div class="inn"></div> </div> </a> </li> </ul> <ul class="flip secondPlay"> <li class="before"> <a href="#"> <div class="up"> <div class="shadow"></div> <div class="inn"></div> </div> <div class="down"> <div class="shadow"></div> <div class="inn"></div> </div> </a> </li> <li class="active"> <a href="#"> <div class="up"> <div class="shadow"></div> <div class="inn"></div> </div> <div class="down"> <div class="shadow"></div> <div class="inn"></div> </div> </a> </li> </ul>'); if (seconds != null) { let timer = [...(seconds + '')]; timer.length == 1 && timer.unshift('0'); $(`#${selector}.timer_container`).attr('tens', timer[0]); $(`#${selector}.timer_container`).attr('ones', timer[1]); } data[`${selector}`].tens = parseInt($(`#${selector}.timer_container`).attr('tens')); data[`${selector}`].ones = parseInt($(`#${selector}.timer_container`).attr('ones')); $(`#${selector} .minutePlay .before .inn, #${selector} .minutePlay .active .inn`).text(data[`${selector}`].tens); $(`#${selector} .secondPlay .before .inn, #${selector} .secondPlay .active .inn`).text(data[`${selector}`].ones); $(`#${selector}.timer_container`).addClass('play'); }; window.timerStart = (selector, setting = { unit: 1000, count: 'down', limit: [0, 0], continuous: false, autoplay: false }, timeUp = () => {}) => { const { unit, count, limit, continuous, autoplay } = setting; if (data[`${selector}`].started == false) { autoplay && onesPlay(); data[`${selector}`].inteval = setInterval(onesPlay, unit); data[`${selector}`].started = true; } function onesPlay() { if (count == 'down') { if (!continuous && data[`${selector}`].tens <= limit[0] && data[`${selector}`].ones <= limit[1]) { timerStop(selector); timeUp(); } else { data[`${selector}`].ones == 0 && tensPlay(); data[`${selector}`].ones = data[`${selector}`].ones > 0 ? (data[`${selector}`].ones - 1) % 10 : 9; $(`#${selector} .secondPlay li`).toggleClass('active before'); } } else { if (!continuous && data[`${selector}`].tens >= limit[0] && data[`${selector}`].ones >= limit[1]) { timerStop(selector); timeUp(); } else { data[`${selector}`].ones == 9 && tensPlay(); data[`${selector}`].ones = (data[`${selector}`].ones + 1) % 10; $(`#${selector} .secondPlay li`).toggleClass('active before'); } } $(`#${selector} .secondPlay .active .inn`).text(data[`${selector}`].ones); } function tensPlay() { if (count == 'down') { data[`${selector}`].tens = data[`${selector}`].tens > 0 ? (data[`${selector}`].tens - 1) % 10 : limit[0]; } else { data[`${selector}`].tens = data[`${selector}`].tens >= limit[0] ? 0 : (data[`${selector}`].tens + 1) % 10; } $(`#${selector} .minutePlay li`).toggleClass('active before'); $(`#${selector} .minutePlay .active .inn`).text(data[`${selector}`].tens); } }; window.timerReset = (selector) => { timerStop(selector); timerInit(selector); data[`${selector}`].started = false; if (data[`${selector}`].inteval != null) clearInterval(data[`${selector}`].inteval); }; window.timerStop = (selector) => { data[`${selector}`].started = false; if (data[`${selector}`].inteval != null) clearInterval(data[`${selector}`].inteval); }; window.timerCheck = (selector) => parseInt(`${data[`${selector}`].tens}${data[`${selector}`].ones}`); });
  
// Fie type
const CONST_AUDIO = 'audio';
const CONST_ICON = 'icon';
const CONST_VIDEO = 'video';
const CONST_IMAGE = 'image';

// Select box not option
const CONST_NOTOPTION = 'notOption';

// Element Type
const CONST_CONTROL_SELECTBOX = 'selectBox';

// Configuration Bar
const CONST_FONT_SELECT = 'fontSelect';
const CONST_FONTSIZE_SELECT = 'fontSizeSelect';
const CONST_COUNTDOWN_TEXTBOX = 'countDownTextBox';

// Input file max size
const CONST_MAX_SIZE_ALLOW = 30 * 1024 * 1024;
const ERROR_MAX_SIZE_ALLOW = 'File quá nặng, xin hãy chọn file dưới 50Mb';

const ERROR_WRONG_GAME = 'File vừa nhập không hợp lệ';
const SUCCESS_IMPORT_GAME = 'Nhập file thành công';
const SUCCESS_OPEN_SAMPLE_GAME = 'Đã mở ví dụ thành công';
const FAILED_OPEN_SAMPLE_GAME = 'Không tìm thấy ví dụ. Hãy kiểm tra lại đường dẫn.';
// Font Family
window.fontList = [
    { name: 'Arial' },
    { name: 'Verdana' },
    { name: 'Helvetica' },
    { name: 'Tahoma' },
    { name: 'Trebuchet MS' },
    { name: 'Times New Roman' },
    { name: 'Georgia' },
    { name: 'Garamond' },
    { name: 'Courier New' },
    { name: 'Brush Script MT' },
  ];

// Font Size List
window.fontSizeList = [
  { name: '30' },
  { name: '36' },
  { name: '42' },
  { name: '48' },
  { name: '52' },
  { name: '56' },
  { name: '64' },
  { name: '72' },
]

// Init all the Asset
$(document).ready(function () {
    loadAsset(window.gameCustomAsset);
});

function loadAsset(asset) {
    asset.forEach(element => {
        loadAssetAndDestroy(element);
    });
}

function loadAssetAndDestroy(element) {
    if (element.type == CONST_ICON) {
        $(`[name=${element.name}]`).attr('href', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_ICON', element.name);
    }

    if (element.type == CONST_AUDIO) {
        $(`[name=${element.name}]`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_AUDIO', element.name);
    }

    if (element.type == CONST_IMAGE) {
        $(`[name=${element.name}]`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_IMAGE', element.name);
    }

    if (element.type == CONST_VIDEO) {
        $(`[name=${element.name}]`).attr('src', element.base64);
        console.log('GamePlayAssetLoader.AssetLoaded: CONST_VIDEO', element.name);
    }

    if (element.type == CONST_CONTROL_SELECTBOX) {
        loadSelectOption(`[name=${element.name}]`, element.data, false);
    }

    if (element.destroy != 'false') {
        element.base64 = '';
    }

}

class Setup {
    changeFontSize = (value) => {
      setting.font.fontSize = parseInt(value);
      $('.slideList').css('font-size', setting.font.fontSize);
    };
  
    initial() {
      this.changeFontSize(setting.font.fontSize);
      $(document).on('change', '#fontSize', () => {
        this.changeFontSize($('#fontSize').val());
      });
      $(document).on('click', '#setupBtn', function () {
        $('#setupPanel').toggleClass('active');
        $(this).toggleClass('active');
      });
      $(document).on('click', '.hideQuestionList', function () {
        $('.wrap_question_list').toggleClass('active');
        $(this).toggleClass('active');
      });
  
      $(document).on('input', '#setupPanel .background', function () {
        let file = $(this)[0].files[0];
        toBase64(file, (base64) => {
          let player = document.getElementById('backgroundSlideVideo');
          if (file.type.includes('video')) {
            $('.slideList')[0].style.removeProperty('background-image');
            base64 = `data:video/mp4;base64,${base64}`;
            player.setAttribute('src', base64);
            setting.background = { type: 'video', name: file.name, base64 };
          } else if (file.type.includes('image')) {
            player.removeAttribute('src');
            base64 = `data:image/gif;base64,${base64}`;
            $('.slideList').css('background-image', 'url(' + base64 + ')');
            setting.background = { type: 'image', name: file.name, base64 };
          }
        });
        $(this).val(null);
      });
      $(document).on('change', '#setupPanel .basic .color', function () {
          setting.font.color = $(this).val();
          $('.questionPreview').css('color', setting.font.color)
      });
      $(document).on('change', '#setupPanel .basic .countdown', function () {
        if ($.isNumeric($(this).val()) && $(this).val() < 100) {
          setting.countdown = $(this).val();
          timerReset('minute_counter');
          timerReset('second_counter');
          timerInit('minute_counter', $(this).val());
          timerInit('second_counter', 0);
        }
      });
  
      // Click on Hủy video/image background button 
      $(document).on('click', '#setupPanel #destroyBackgroundMedia', function () {
        // delete current background image
        $('.slideList')[0].style.removeProperty('background-image');
        // reset default background video source
        window.gameCustomAsset.forEach(element => {
          if (element.name == 'backgroundSlideVideo') {
              $(`[name=${element.name}]`).attr('src', element.base64);
          }
        });
      });
  
    }
    update() {
      let { countdown } = setting;
      let { fontSize, color } = setting.font;
  
      $('#fontSize').val(fontSize).trigger('change');
      $('#setupPanel .basic .color').val(color).trigger('change');
      $('#setupPanel .countdown').val(countdown).trigger('change');
    }
  }
  
  var isFirstClicked = false;
  // Play background music
  $(document).on('click', function () {
    // Auto start game
    if (!isFirstClicked) {
      isFirstClicked = true;
      $('#audio_background')[0].play();
    }
  });

  $(document).on('click', '#gameIntroBtn', function () {
    console.log('open/close intro');
    $('#gameIntro').toggleClass('active');
    $('#gameIntroBtn').toggleClass('active');
});

window.isLoading = (bool) => {
    if (bool) {
        $("#loading")
        .removeClass("d-none")
        .addClass("d-flex");
    } else {
        $("#loading")
        .removeClass("d-flex")
        .addClass("d-none");
    }
}
window.toBase64 = (file, onload) => {
    var reader = new FileReader();
    reader.onload = function () {
      var base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
      onload(base64);
    };
    reader.readAsDataURL(file);
  };
  window.download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  Array.prototype.shuffle = function () {
    let m = this.length,
      i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]];
    }
    return this;
  };
  window.animateCSS = (node, animation, func = () => {}, option = '', prefix = 'animate__') =>
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const optionName = `${prefix}${option}`;
      node.addClass([`${prefix}animated`, animationName, optionName]);
      /* When the animation ends, we clean the classes and resolve the Promise */
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.removeClass([`${prefix}animated`, animationName, optionName]);
        func();
        resolve('Animation ended');
      }
      node[0].addEventListener('animationend', handleAnimationEnd, { once: true });
    });
  
  window.obfuscate = (codeText) => {
    const options = {
      compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    };
    const obfuscationResult = JavaScriptObfuscator.obfuscate(codeText, options);
  
    return obfuscationResult.getObfuscatedCode();
  }
  
  window.toDataURL = (url, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  window.toTextFromUrl = (url, callback) => {
    $.ajax({
      type: "GET",
      contentType: "application/text",
      url: url,
      dataType: 'text',
      cache: false,
      success: function (data) {
        callback(data)
      },
      error: function (e) {
      }
    });
  }
  
  function showAlert(alertText) {
    Swal.fire({
      icon: 'info',
      title: 'Thông báo',
      text: alertText
    });
    $("body").removeClass("swal2-height-auto");
  }
  
  function toggle_full_screen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
      }
      else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
          document.documentElement.mozRequestFullScreen();
      }
      else if (document.documentElement.webkitRequestFullScreen) {   /* Chrome, Safari & Opera */
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      else if (document.msRequestFullscreen) { /* IE/Edge */
          document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      }
      else if (document.mozCancelFullScreen) { /* Firefox */
          document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {   /* Chrome, Safari and Opera */
          document.webkitCancelFullScreen();
      }
      else if (document.msExitFullscreen) { /* IE/Edge */
          document.msExitFullscreen();
      }
    }
  }
  
  function getTimeForFileName() {
    let newDate = new Date();
    let strTime = newDate.toLocaleDateString().replace('/','-') + newDate.toLocaleTimeString().replace(':','-');
    console.log('strTime', strTime);
    return strTime;
  }

  $(document).ready(function () {
    if (typeof questionList == 'undefined' && typeof setting == 'undefined') {
      let data = JSON.parse($('#game_data_text').text());
      window.questionList = data.questionList;
      window.setting = data.setting;
    }
    setting.countdown > 0 ? timerInit('minute_counter', setting.countdown) : timerInit('minute_counter');
    timerInit('second_counter');
    window.replay = () => {
      questionList.index = 0;
      reRender(questionList.index);
      $('.score_board .score, .score_board.--end .score').text(0);
      $('.score_board .question_number').text(1);
      $('.score_board.--end').addClass('d-none');
      $('.slideList .startgame').removeClass('d-none');
      $('.questionPreview').css('visibility', 'hidden');
    };
    function reRender() {
      const { data, index } = questionList;
      const { question } = data[index];
      $('.slideList .questionPreview').empty();
      [...questionList.data[questionList.index].question.value].forEach((char) => {
        $('.slideList .questionPreview').append(`<span class="gameLetter">${char}</span>`);
      });
      $('.score_board .question_number').text(index + 1);
    }
    let startTimer = () => {
      let defaultSetting = { count: 'down', limit: [5, 9], continuous: true, autoplay: true };
      let { count, limit, continuous, autoplay } = defaultSetting;
      setting.countdown <= 0 && (count = 'up') && (autoplay = false);
      timerStart('second_counter', { unit: 1000, count, limit, continuous });
      limit = setting.countdown <= 0 ? [9, 9] : [0, 0];
      continuous = false;
      timerStart('minute_counter', { unit: 60000, count, limit, continuous, autoplay }, () => {
        $('.score_board.--end.--gameover').removeClass('d-none');
        $('.questionPreview').css('visibility', 'hidden');
        timerStop('second_counter');
      });
    };
    $(document).on('click', '.score_board.--end .replay', function () {
      replay();
      timerReset('minute_counter');
      timerReset('second_counter');
    });
  
    var audio_correct = document.getElementById('audio_correct');
    var audio_wrong = document.getElementById('audio_wrong');
    var audio_win = document.getElementById('audio_win');
    var audio_lose = document.getElementById('audio_lose');
  
    // When click start game
    $(document).on('click', '.startgame strong', function () {
      $(this).parent().addClass('d-none');
      startTimer();
      $('.questionPreview').css('visibility', 'visible');
    });
    $(document).on(
      {
        mouseenter: function () {
          $(this).addClass('selected animate__animated animate__heartBeat animate__infinite');
        },
        mouseleave: function () {
          $(this).removeClass('selected animate__animated animate__heartBeat animate__infinite');
        },
        click: function () {
          $(this).remove();
          const { index } = questionList;
          let user_answer = $('.questionPreview').children().text();
          let true_answer = questionList.data[index].answer.value;
          if (user_answer.length <= true_answer.length) {
            let className = '';
            let text = '';
            if (user_answer.toLowerCase() == true_answer.toLowerCase()) {
              className = '--correct';
              text = 'Correct !';
              audio_correct.play();
              $('.score_board .score').text(function () {
                return parseInt($(this).text()) + 1;
              });
            } else {
              className = '--incorrect';
              text = 'Incorrect !';
              audio_wrong.play();
            }
            $('.resultPanel').addClass(className).text(text);
            animateCSS($('.resultPanel'), 'backInDown', () => {
              setTimeout(() => {
                $('.resultPanel').removeClass(className).text('');
                if (questionList.index + 1 < questionList.data.length) {
                  questionList.index += 1;
                  $('.slideList .questionPreview').empty();
                  [...questionList.data[questionList.index].question.value].forEach((char) => {
                    $('.slideList .questionPreview').append(`<span class="gameLetter">${char}</span>`);
                  });
                  $('.score_board .question_number').text(questionList.index + 1);
                } else {
                  $('.questionPreview').css('visibility', 'hidden');
                  if (parseInt($('.score_board .score').text()) > questionList.data.length / 2) {
                    $('.score_board.--end.--congrats').removeClass('d-none');
                    audio_win.play();
                  } else {
                    $('.score_board.--end.--gameover').removeClass('d-none');
                    audio_lose.play();
                  }
                  timerStop('minute_counter');
                  timerStop('second_counter');
                }
              }, 1000);
            });
          }
        },
      },
      '.gameLetter'
    );
  });

  
  class Input {
    constructor(value = '') {
      this.value = value;
    }
    setValue(value) {
      this.value = value;
    }
  }
  class Question extends Input {
    setValue(value, index) {
      super.setValue(value);
      this.render();
      let inputEle = $('.question .inputQuestion').eq(index);
      inputEle.val().length <= 0 && inputEle.val(value);
    }
    render() {
      $('.slideList .questionPreview').empty();
      [...this.value].forEach((char) => {
        $('.slideList .questionPreview').append(`<span class="gameLetter">${char}</span>`);
      });
    }
  }
  class Answer extends Input {
    setValue(value, index) {
      super.setValue(value);
      this.render();
      let inputEle = $('#questionList .question').eq(index).find('.inputAnswer');
      inputEle.val().length <= 0 && inputEle.val(value);
    }
    render() {
      $('.slideList .answerPreview').text(this.value);
    }
  }
  class QuestionList {
    index = 0;
    data = [];
    constructor() {
      this.getIndex();
    }
    load(preset) {
      this.data.splice(-this.data.length);
      $('#questionList .question').slice(-this.data.length).remove();
      this.add(preset.length);
      this.data.forEach((el, i) => {
        this.index = i;
        let { question, answer } = preset[this.index];
        el.question.setValue(question.value, this.index);
        el.answer.setValue(answer.value, this.index);
      });
      $('.score_board.--end .replay').trigger('click');
    }
    add(number = 1) {
      for (let i = 0; i < number; i++) {
        this.data = [...this.data, { question: new Question(''), answer: new Answer('') }];
        let questionPanel = window.questionPanel.replace('<strong>1</strong>', `<strong>${this.data.length}</strong>`);
        $(`#questionList`).append(questionPanel);
        this.data.length > 1 ? $('#btnDel').removeAttr('disabled') : $('#btnDel').attr('disabled');
      }
      $('.score_board .total').text(this.data.length);
    }
    remove(number = 1) {
      if (this.data.length > number) {
        if (this.index >= this.data.length - number) {
          this.index = this.data.length - number - 1;
          this.render();
        }
        this.data.splice(-number);
        $('#questionList .question').slice(-number).remove();
        this.data.length <= 1 && $('#btnDel').attr('disabled', true);
        $('.score_board .total').text(this.data.length);
      }
    }
    render() {
      this.data[this.index].question.render();
      this.data[this.index].answer.render();
      $('.score_board .question_number').text(this.index + 1);
    }
    getIndex() {
      $(document).ready(() => {
        let that = this;
        $(document).on('click focus', `.question`, function () {
          that.index = $(this).index();
          that.render();
        });
      });
    }
  }
  
  let setup = new Setup();

  
  /* MAIN */
  $(document).ready(function () {
    setup.initial();
    setup.update();
    window.questionList = new QuestionList();
    questionList.add();
  });

    $(document).on('click', '#btnAdd', () => {
      let inputAmount = $('#inputAmount').val();
      $.isNumeric(inputAmount) ? questionList.add(inputAmount) : questionList.add();
    });
    $(document).on('click', '#btnDel', () => {
      let inputAmount = $('#inputAmount').val();
      $.isNumeric(inputAmount) ? questionList.remove(inputAmount) : questionList.remove();
    });
    $(document).on('input', '#questionList .inputQuestion', function () {
      let { index, data } = questionList;
      data[index].question.setValue($(this).val(), index);
    });
    $(document).on('input', `.question .inputAnswer`, function () {
      let { index, data } = questionList;
      data[index].answer.setValue($(this).val(), index);
    });
    $(document).on('click', '#exportHtml', function () {
      replay();
      // Lưu game Intro
      saveIntro();
      let html = $('html').clone();
      html.find('.main_container>:not(#createPage)').remove();
      html.find('#createPage>:not(.main_view)').remove();
      html.find('.main_view>:not(.slideList)').remove();
      html.find('.slideList').css('max-height', '100vh');
      html.find('.score_board .win, .score_board .loose').addClass('d-none');
      html.find('.slideList').append(`<p id="game_data_text" class="d-none">${JSON.stringify({ data: window.questionList, setting })}</p>`);
      html.find('link[rel="stylesheet"], script:not([type="text/javascript"])').remove();
      download(
        window.setting.gameinfo.name + '_' + getTimeForFileName() +'.html',
        html
          .wrapAll('<div>')
          .parent()
          .html()
          .replace(/<!.+-->/g, '')
      );
    });
  
    $(document).on('click', '#exportDataFile', function () {
      console.log('Start download Data');
      window.isLoading(true);
      // Lưu game Intro
      saveIntro();
      let dataSaved = JSON.stringify({ data: window.questionList, setting });
      download(`${window.setting.gameinfo.name}_${getTimeForFileName()}.VietEduSoft`, dataSaved);
    
      setTimeout(() => {
        window.isLoading(false);
      }, 1000)
    
    });
  
    // Lưu game Intro
    function saveIntro() {
      window.setting.gameIntro.gameIntro_title = $('#gameIntro_title').text();
      window.setting.gameIntro.gameIntro_detail = $('#gameIntro_detail').text();
    }
  
    // Get game Intro
    function setIntro() {
      $('#gameIntro_title').text(window.setting.gameIntro.gameIntro_title);
      $('#gameIntro_detail').text(window.setting.gameIntro.gameIntro_detail);
    }
  
    
    $(document).on('change', '#importHtml', function () {
      try {
        var file = $(this)[0].files[0];
        $(this).val(null);
        let extension = file.name.split(".").pop();
        console.log('File extension: ', extension);
        if (extension == 'html') {
          var reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = () => {
            Promise.resolve($(reader.result).find('#game_data_text').text())
              .then(JSON.parse)
              .then(({ data, setting }) => {
                if (setting.gameinfo.name === window.setting.gameinfo.name) {
                    window.setting = setting;
                    //window.questionList = data;
                    window.questionList.load(data.data);
                    setIntro();
                    setup.update();
                    loadBackground();
                    replay();
                    showAlert(SUCCESS_IMPORT_GAME);
                } else {
                  showAlert(ERROR_WRONG_GAME);
                }
              });
          };
        }
      
        else if (extension == 'VietEduSoft') {
          console.log('file .VietEduSoft');
          var reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = () => {
            let jsonData = JSON.parse(reader.result);
            console.log(jsonData.gameinfo);
            // If setting.gameinfo.name from File equal to gameinfoName in GameEditor.js
            console.log(jsonData);
            if (jsonData.setting.gameinfo.name === window.setting.gameinfo.name) {
              window.setting = jsonData.setting;
              window.questionList.load(jsonData.data.data);
              setIntro();
              setup.update();
              loadBackground();
              replay();
              showAlert(SUCCESS_IMPORT_GAME);
            } else {
              showAlert(ERROR_WRONG_GAME);
            }
          }
        }
      } catch (err) {
        showAlert(ERROR_WRONG_GAME);
        console.log('err = ', err);
      }
    });
  
  
    function loadBackground() {
      let player = document.getElementById('backgroundSlideVideo');
      console.log('setting.background.type = ',setting.background.type);
      console.log(setting.background);
      if (setting.background.type.includes('video')) {
        $('.slideList')[0].style.removeProperty('background-image');
        player.setAttribute('src', setting.background.base64);
      } else if (setting.background.type.includes('image')) {
        player.removeAttribute('src');
        $('.slideList').css('background-image', 'url(' + setting.background.base64 + ')');
      }
    }
  

  
  window.questionPanel = '<div class="question"><div class="input-group mr-sm-2"><div class="input-group-prepend"><div class="input-group-text"><strong>1</strong></div></div><input type="text" class="form-control inputQuestion" placeholder="Từ sai"></div><div class="input-group mr-sm-2 mt-2"><input type="text" class="form-control inputAnswer" placeholder="Đáp án"></div></div>';
window.setting = {
  countdown: 0,
  font: { fontFamily: 'Arial', fontSize: 30, color: '#FFFFFF'},
  gameinfo: {name: 'PointMeOut'},
  gameIntro: {gameIntro_title:'', gameIntro_detail:''}
};

// OpenGameSampleHelper.js

function readGameData(sampleName) {
  $.getJSON('gameFileData/' + sampleName, function(jsonData) {
      if (jsonData) {
          window.setting = jsonData.setting;
          window.questionList.load(jsonData.data.data);
          setIntro();
          setup.update();
          loadBackground();
          replay();
          showAlert(SUCCESS_IMPORT_GAME);
      } else {
          showAlert(FAILED_OPEN_SAMPLE_GAME);
      }

  }).fail(function() {showAlert(FAILED_OPEN_SAMPLE_GAME)});
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

$( document ).ready(function() {
  var sampleID = getUrlParameter('sampleID');
  console.log('Load game' + sampleID);
  if (sampleID) {
      readGameData(sampleID);
  }
});