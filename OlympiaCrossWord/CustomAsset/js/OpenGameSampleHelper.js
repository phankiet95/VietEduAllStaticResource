// OpenGameSampleHelper.js

//http://127.0.0.1:5501/VietEduDevelop/CrossWord/index.html?sampleID=sample1

function readGameData(sampleName) {
    $.getJSON('gameFileData/' + sampleName, function (jsonData) {
        if (jsonData) {
            window.setting = jsonData.setting;
            window.questionList = jsonData.data;
            loadQuestionFromListData();
            setIntro();
            $('.countdown').val(window.setting.countdown);
            currentChosenIndex = -1;
            showAlert(SUCCESS_OPEN_SAMPLE_GAME);
        } else {
            showAlert(FAILED_OPEN_SAMPLE_GAME);
        }

    }).fail(function () { showAlert(FAILED_OPEN_SAMPLE_GAME) });
}

// kiet new add
function readGameData(sampleName) {

    $.getJSON('gameFileData/' + sampleName, function (jsonData) {
        if (jsonData) {
            console.log('Start download Data');

            window.slideData.setting = jsonData.data.setting;
            window.slideData.data = jsonData.data.data;
            //loadQuestionFromListData();
            updateSlideView('loadFile');
            $('#countdown').text(window.slideData.setting.countdown.second);
            $('#config_countdown').val(window.slideData.setting.countdown.second);

            $('#colorOverlayRange').val(window.slideData.setting.background.colorOverlayOpacity);
            $('#backgroundColorLayer').css('Opacity', (window.slideData.setting.background.colorOverlayOpacity / 100).toString());

            $('#textureEffectRange').val(window.slideData.setting.background.textureEffectOpactity);
            $('#backgroundAnimationLayer').css('Opacity', (Number(window.slideData.setting.background.textureEffectOpactity) / 100).toString());

            // Re-apply Background Media
            destroyMedia();
            if (slideData.setting.customBackground.type.includes('video')) {
                $('#backgroundSlideVideo').attr('src', `data:video/mp4;base64,${slideData.setting.customBackground.base64}`);
                slideData.setting.background.type = 'video';
                slideData.setting.customBackground.type = 'video';
            }

            if (slideData.setting.customBackground.type.includes('image')) {
                setBackgroundPicture('#backgroundPictureLayer', slideData.setting.customBackground.base64);
                slideData.setting.background.type = 'image';
                slideData.setting.customBackground.type = 'image';

            }

            if (slideData.setting.customMusic.type.includes('music')) {
                $(currentTab + ' #backgroundSlideAudio').attr('src', `data:audio/ogg;base64,${slideData.setting.customMusic.base64}`);

            }
            console.log('Open File Successed');
        } else {
            console.log('Open File Failed');
        }

    }).fail(function () { console.log('Open File Failed'); });

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

$(document).ready(function () {
    var sampleID = getUrlParameter('sampleID');
    console.log('Load game' + sampleID);
    if (sampleID) {
        readGameData(sampleID);
    }
});



