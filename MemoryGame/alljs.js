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
const ERROR_MAX_SIZE_ALLOW = 'File quá nặng, xin hãy chọn file dưới 30Mb';

// notice
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
        $('.slideList .boxcard').css('font-size', setting.font.fontSize);
    };

    initial() {
        this.changeFontSize(setting.font.fontSize);
        // Change fontsize
        $(document).on('change', '#fontSize', () => {
            this.changeFontSize($('#fontSize').val());
        });
        $(document).on('click', '#setupBtn', function () {
            $('#setupPanel').toggleClass('active');
            $(this).toggleClass('active');
        });
        $(document).on('click', '.hideQuestionList', function () {
            $('#leftPanel').toggleClass('active');
            $(this).toggleClass('active');
        });
        $(document).on('change', '#setupPanel .background_color', function () {
            let player = document.getElementById('backgroundSlideVideo');
            player.removeAttribute('src');
            setting.background.color = $(this).val().split(',');
            let { color } = setting.background;
            console.log('color ', color);
            if (color.length == 1) {
                $('.slideList').css('background-image', 'none');
            }
            $('.slideList').css('background-image', `linear-gradient(to right, ${color[0]}, ${color[1]})`);
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
        // Change font color of cell
        $(document).on('change', '#setupPanel .color', function () {
            $('.slideList .boxcard').css('color', $(this).val());
            setting.cell.color = $(this).val();
        });

        // Change background color of cell
        $(document).on('change', '#setupPanel .bgColor', function () {
            $('.slideList .boxcard>div:not(.blank)').children().css('background-color', $(this).val());
            setting.cell.bgColor = $(this).val();
        });

        // Set time countdown
        $(document).on('change', '#setupPanel .basic .countdown', function () {
            if ($.isNumeric($(this).val()) && $(this).val() < 100) {
                setting.countdown = $(this).val();
                timerReset('minute_counter');
                timerReset('second_counter');
                timerInit('minute_counter', $(this).val());
                timerInit('second_counter', 0);
            }
        });
    }

    update() {
        let { background, countdown } = setting;
        let { color, bgColor, pair } = setting.cell;
        let { fontFamily, fontSize } = setting.font;
        $('#fontFamily').val(fontFamily).trigger('change');
        $('#fontSize').val(fontSize).trigger('change');
        $('#cellNumber').val(pair);
        if (background.type == 'video') {
            $('.slideList')[0].style.removeProperty('background-image');
            let player = document.getElementById('backgroundSlideVideo');
            player.setAttribute('src', background.base64);
        }

        if (background.type == 'image') {
            $('.slideList').css('background-image', `url(${background.base64})`);
        }

        $('#setupPanel .color').val(color).trigger('change');
        $('#setupPanel .color').val(color).trigger('change');
        $('#setupPanel .bgColor').val(bgColor).trigger('change');
        $('#setupPanel .countdown').val(countdown).trigger('change');
    }
}

// Play background music
var isFirstClicked_formusic = false;
$(document).on('click', function () {
    // Auto start game
    if (!isFirstClicked_formusic) {
        isFirstClicked_formusic = true;
        $('#audio_background')[0].play();
    }
});

$(document).on('click', '#setupPanel #fullscreenbtn', function () {
    toggle_full_screen();
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
window.animateCSS = (node, animation, func = () => { }, option = '', prefix = 'animate__') =>
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
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
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

function getTimeForFileName() {
    let newDate = new Date();
    let strTime = newDate.toLocaleDateString().replace('/', '-') + ' ' + newDate.toLocaleTimeString().replace(':', '-');
    console.log('strTime', strTime);
    return strTime;
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



$(document).ready(function () {
    typeof setting == 'undefined' && (window.setting = JSON.parse($('#game_data_text').text()).setting);
    if (setting.countdown > 0) {
        timerInit('minute_counter', setting.countdown);
    } else {
        timerInit('minute_counter');
    }
    timerInit('second_counter');
    let cell1st = null;
    let cell2nd = null;
    let startTimer = () => {
        let defaultSetting = { count: 'down', limit: [5, 9], continuous: true, autoplay: true };
        let { count, limit, continuous, autoplay } = defaultSetting;
        setting.countdown <= 0 && (count = 'up') && (autoplay = false);
        timerStart('second_counter', { unit: 1000, count, limit, continuous, autoplay: false });
        limit = setting.countdown <= 0 ? [9, 9] : [0, 0];
        continuous = false;
        timerStart('minute_counter', { unit: 60000, count, limit, continuous, autoplay }, () => {
            audio_timeout.play();
            timerStop('second_counter');
            $('.score_board .loose').removeClass('d-none');
            $('.slideList .boxcard .cell_content').unbind('click');
        });
    };

    var audio_openCard = document.getElementById("audio_openCard");
    var audio_hideCard = document.getElementById("audio_hideCard");
    var audio_matchedCard = document.getElementById("audio_matchedCard");
    var audio_timeout = document.getElementById("audio_timeout");

    function openCard() {
        startTimer();

        audio_openCard.play();
        $(this).children('span, img').slideDown('fast');

        // Add Flip animation then remove it
        $(this).addClass('animate__flip');
        setTimeout(() => {
            $(this).removeClass('animate__flip');
        }, 500);
        //-------

        // Check if user click First Card.
        if (cell1st == null) { // If it is first card
            // set first pick value
            cell1st = $(this).children('span, img');
            $(this).unbind('click');
        } else { // If it is the second card
            // set second pick value
            cell2nd = $(this).children('span, img');
        }

        // This section for the Second card
        if (cell2nd != null) {
            // Check if cards value don't matched
            if (cell1st.attr('class') != cell2nd.attr('class')) {
                audio_hideCard.play();
                $('.slideList .boxcard .cell_content').unbind('click');
                // Close both card
                setTimeout(() => {
                    cell1st != null && cell1st.slideUp('fast') && (cell1st = null);
                    cell2nd != null && cell2nd.slideUp('fast') && (cell2nd = null);
                    $('.slideList .boxcard .cell_content:not(.matched)').bind('click', openCard);
                }, 800);
            } else { // If cards value were matched
                audio_matchedCard.play();
                cell1st != null && cell1st.parent().addClass('matched').unbind('click') && (cell1st = null);
                cell2nd != null && cell2nd.parent().addClass('matched').unbind('click') && (cell2nd = null);
                // When there is 0 unsolved cards.
                if ($('.slideList .boxcard .cell_content').children(':hidden').length <= 0) {
                    timerStop('second_counter');
                    timerStop('minute_counter');
                    $('.score_board .win').removeClass('d-none');
                }
            }
        }
    }

    $.fn.shuffleChildren = function () {
        $.each(this.get(), function (index, el) {
            var $el = $(el);
            var $find = $el.children();
            $find.sort(function () {
                return 0.5 - Math.random();
            });
            $el.empty();
            $find.appendTo($el);
        });
    };
    $('.slideList .boxcard').shuffleChildren();
    let reloadGame = () => {

        // Add Flip animation then remove it
        $('.slideList .boxcard').addClass('animate__animated animate__flip');
        setTimeout(() => {
            $('.slideList .boxcard').removeClass('animate__animated animate__flip');
        }, 500);
        // --------------------
        cell1st = null;
        cell2nd = null;
        timerReset('minute_counter');
        timerReset('second_counter');
        $('.slideList .boxcard').shuffleChildren();
        $('.slideList .boxcard .cell_content').removeClass('matched');
        $('.score_board .win, .score_board .loose').addClass('d-none');
        $('.slideList .boxcard .cell_content').children().css('display', 'none');
        $('.slideList .boxcard .cell_content').bind('click', openCard);
    };
    $(document).on('click', '.slideList .reloadGame', function () {
        reloadGame();
    });
    $('.slideList .boxcard .cell_content').bind('click', openCard);
    $('.slideList .boxcard .cell_content').children().css('display', 'block');
    setTimeout(() => {
        $('.slideList .boxcard .cell_content').children().css('display', 'none');
    }, 3000);
    reloadGame();
});


class KeyPair {
    constructor(value = '', image = '', index = null) {
        this.value = value;
        this.image = image;
        if (index != null) {
            this.renderKey(index);
            this.renderImage(index);
        }
    }
    setValue(value, index) {
        this.value = value;
        this.renderKey(index);
    }
    setImage(image, index) {
        this.image = image;
        this.renderImage(index);
    }
    renderKey(index) {
        let { bgColor } = setting.cell;
        let background_color = bgColor;
        let slideIndex = $(`.slideList .boxcard .cell_content>span[class=${index}]`).parent().parent().index();
        this.value.length > 0 ? $('.slideList .boxcard>div').eq(slideIndex).removeClass('blank') : (background_color = 'darkgrey');
        $('.question .inputQuestion').eq(index).val() == '' && this.value != '' && $('.question .inputQuestion').eq(index).val(this.value);
        $('.slideList .boxcard>div').eq(slideIndex).children().css('background-color', background_color);
        $('.slideList .boxcard>div').eq(slideIndex).find('span').text(this.value);
    }
    renderImage(index) {
        let { bgColor } = setting.cell;
        let background_color = bgColor;
        let slideIndex = $(`.slideList .boxcard .cell_content>img[class=${index}]`).parent().parent().index();
        this.image != '' ? $('.slideList .boxcard>div').eq(slideIndex).removeClass('blank') : (background_color = 'darkgrey');
        $('.slideList .boxcard>div')
            .eq(slideIndex)
            .find('img')
            .attr('src', this.image == '' ? '' : `data:image/jpg;base64,${this.image}`);
        $('.slideList .boxcard>div').eq(slideIndex).children().css('background-color', background_color);
        $('#questionList .question')
            .eq(index)
            .find('img')
            .attr('src', this.image == '' ? './image/plus.png' : `data:image/jpg;base64,${this.image}`);
    }
    render(index) {
        this.renderKey(index);
        this.renderImage(index);
    }
}
class KeyPairList {
    #id = '#questionList';
    data = [];
    getId() {
        return this.#id;
    }
    remove(number = 1) {
        this.data.splice(-number);
        $(`${this.#id} .question`).slice(-number).remove();
        $('.slideList .boxcard>div')
            .slice(-number * 2)
            .remove();
    }
    add(number = 1, preset = null) {
        this.remove(this.data.length);
        let newPair = null;
        preset != null && (number = preset.length);
        for (let i = 0; i < number; i++) {
            $(`${this.#id}`).append(questionPanel.replace('<strong>1</strong>', `<strong>${this.data.length+1}</strong>`));
            $('.slideList .boxcard').append(`<div class="blank"><div class="cell_content animate__animated animate__pulse animate__slow animate__infinite "><span class=${i}></span></div></div><div class="blank"><div class="cell_content animate__animated animate__pulse animate__slow animate__infinite"><img class=${i}></div></div>`);
            if (preset == null) newPair = new KeyPair();
            else {
                newPair = new KeyPair(preset[i].value, preset[i].image, i);
                newPair.render(i);
            }
            this.data = [...this.data, newPair];
        }
    }
}

var isFirstClicked = false;
let keyPairList = new KeyPairList();
let setup = new Setup();
/* MAIN */
$(document).ready(function () {

    setup.initial();
    keyPairList.add(8);

    // Set default font color
    $('.slideList .boxcard').css('color', '#262626');
});
    // Play background music
    $(document).on('click', function () {
        // Auto start game
        if (!isFirstClicked) {
            isFirstClicked = true;
            $('#reloadGameButton').click();
        }
    });

    $(document).on('change', '#cellNumber', function () {
        setting.cell.pair = $(this).val();
        keyPairList.add($(this).val());
        $('.slideList .boxcard>div')
            .css('width', `calc(100% / ${$(this).children(':selected').text()[0]})`)
            .css('height', `calc(100% / ${$(this).children(':selected').text()[4]})`);
        $('.slideList  .gameHeader .reloadGame').trigger('click');
    });
    $(document).on('change', '.uploadFile', function () {
        let file = $(this)[0].files[0];
        let index = $(this).parents('.question').index();



        // Not change to Webp if image is image/gif
        const fileType = file['type'];
        if (fileType != 'image/gif') {
            console.log('Convert to Webp');
            processFile(file, index);
        } else {
            toBase64(file, (base64) => {
                keyPairList.data[index].setImage(base64, index);
            });
        }

    });

    function processFile(file, index) {
        if (!file) {
          return;
        }
        // Load the data into an image
        new Promise(function (resolve, reject) {
          let rawImage = new Image();
      
          rawImage.addEventListener("load", function () {
            resolve(rawImage);
          });
      
          rawImage.src = URL.createObjectURL(file);
        })
          .then(function (rawImage) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            canvas.width = rawImage.width;
            canvas.height = rawImage.height;
            ctx.drawImage(rawImage, 0, 0);
      
            const output = canvas.toDataURL("image/webp",0.8).replace('data:', '').replace(/^.+,/, '');
      
            keyPairList.data[index].setImage(output, index);
          });
      }

    $(document).on('input', '.inputQuestion', function () {
        let index = $(this).parents('.question').index();
        keyPairList.data[index].setValue($(this).val(), index);
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

    $(document).on('click', '#exportHtml', function () {
        $('.slideList  .gameHeader .reloadGame').trigger('click');
        // Lưu game Intro
        saveIntro();
        let html = $('html').clone();
        html.find('.main_container>:not(#createPage)').remove();
        html.find('#createPage>:not(.main_view)').remove();
        html.find('.main_view>:not(.slideList)').remove();
        html.find('.slideList').css('max-height', '100vh');
        html.find('.boxcard').css('max-height', 'calc(100vmin - 156px)');
        html.find('.score_board .win, .score_board .loose').addClass('d-none');
        console.log(keyPairList.data);
        html.find('.slideList').append(`<p id="game_data_text" class="d-none">${JSON.stringify({ data: keyPairList.data, setting })}</p>`);
        html.find('link[rel="stylesheet"], script:not([type="text/javascript"])').remove();
        download(
            window.setting.gameinfo.name + '_' + getTimeForFileName() + '.html',
            html
                .wrapAll('<div>')
                .parent()
                .html()
                .replace(/<!.+-->/g, '')
        );
    });

    // $(document).on('click', '#exportDataFile', function () {
    //     console.log('Start download Data');
    //     window.isLoading(true);
    //     // Lưu game Intro
    //     saveIntro();
    //     let dataSaved = JSON.stringify({ data: keyPairList.data, setting });
    //     download(`${window.setting.gameinfo.name}_${getTimeForFileName()}.VietEduSoft`, dataSaved);

    //     setTimeout(() => {
    //         window.isLoading(false);
    //     }, 1000)

    // });

    $(document).on('click', '#exportDataFile', function () {
        console.log('Start download Data');
        window.isLoading(true);
        // Lưu game Intro
        saveIntro();
        let dataSaved = JSON.stringify({ data: keyPairList.data, setting });
        //download(`${window.setting.gameinfo.name}_${getTimeForFileName()}.VietEduSoft`, dataSaved);
        downloadPlainText(`${window.setting.gameinfo.name}_${getTimeForFileName()}.VietEduSoft`, dataSaved);
      
        setTimeout(() => {
          window.isLoading(false);
        }, 1000)
      
      });
    
      function downloadPlainText(filename, text) {
        console.log('New Download function');
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
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
                            // If setting.gameinfo.name from File equal to gameinfoName in GameEditor.js
                            if (setting.gameinfo.name === window.setting.gameinfo.name) {
                                window.setting = setting;
                                keyPairList.add(null, data);
                                setup.update();
                                setIntro();
                                $('.slideList  .gameHeader .reloadGame').trigger('click');
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
                    if (setting.gameinfo.name === window.setting.gameinfo.name) {
                        window.setting = jsonData.setting;
                        keyPairList.add(null, jsonData.data);
                        setup.update();
                        setIntro();
                        $('.slideList  .gameHeader .reloadGame').trigger('click');
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



window.questionPanel = `<div class="question"><div class="mt-2"><div class="input-group mr-sm-2"><div class="input-group-prepend"><div class="input-group-text"><strong>1</strong></div></div><input type="text" class="form-control inputQuestion" placeholder="Từ khóa"><div class="input-group-append"><label class="uploadBtn input-group-text d-block"><input class="uploadFile" type="file" accept="image/*"><img src="http://vietedusoft.weebly.com/uploads/2/6/2/2/26226810/plus_orig.png" title="Chọn hình ảnh"></label></div></div></div></div>`;
window.setting = {
    countdown: 0,
    font: { fontFamily: 'Arial', fontSize: 28 },
    background: { type: 'gradient', color: ['#89f7fe', '#66a6ff'] },
    cell: { color: '#262626', bgColor: '#ffffff60', pair: 8 },
    gameinfo: { name: 'MemoryGame' },
    gameIntro: { gameIntro_title: '', gameIntro_detail: '' },
};

// OpenGameSampleHelper.js

function readGameData(sampleName) {
    $.getJSON('gameFileData/' + sampleName, function(jsonData) {
        if (jsonData) {
            window.setting = jsonData.setting;
            keyPairList.add(null, jsonData.data);
            setup.update();
            setIntro();
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
        readGameData(sampleID + ".VietEduSoft");
    }
});