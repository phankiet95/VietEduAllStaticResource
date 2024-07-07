// Data
window.listBackgroundColor = [
    { name: 'Warm Flame', color: ['#ff9a9e', '#fad0c4'] },
    { name: 'Juicy Peach', color: ['#ffecd2', '#fcb69f'] },
    { name: 'Lady Lips', color: ['#ff9a9e', '#fecfef'] },
    { name: 'Winter Neva', color: ['#a1c4fd', '#c2e9fb'] },
    { name: 'Heavy Rain', color: ['#cfd9df', '#e2ebf0'] },
    { name: 'Plum Plate', color: ['#667eea', '#764ba2'] },
    { name: 'Everlasting Sky', color: ['#fdfcfb', '#e2d1c3'] },
    { name: 'Happy Fisher', color: ['#89f7fe', '#66a6ff'] },
    { name: 'Fly High', color: ['#48c6ef', '#6f86d6'] },
    { name: 'Fresh Milk', color: ['#feada6', '#f5efef'] },
    { name: 'Great Whale', color: ['#a3bded', '#6991c7'] },
    { name: 'Aqua Splash', color: ['#13547a', '#80d0c7'] },
    { name: 'Clean Mirror', color: ['#93a5cf', '#e4efe9'] },
    { name: 'Healthy Water', color: ['#96deda', '#50c9c3'] },
    { name: 'Morning Salad', color: ['#B7F8DB', '#50A7C2'] },
  ];

// Init the setupPanel
$(document).ready(function () {
    // init Gradient background List
    loadSelectOption('.setupPanel #backgroundList', window.listBackgroundColor, true);
    $('.setupPanel #backgroundList').val('4. Winter Neva');
    $('.backgroundColorLayer').css('background-image', `linear-gradient(to right, #a1c4fd, #c2e9fb)`);
    $('.backgroundColorLayer').addClass('moving');
    let opac = slideData.setting.background.colorOverlayOpacity + '%';
    $('.backgroundColorLayer').css('Opacity',opac);

    // init Available background Image
    loadSelectOption('.setupPanel #availableBackgroundList', window.availablePic, false);
    let randomSelect = getRandomOption(window.availablePic);
    $('.setupPanel #availableBackgroundList').val(randomSelect.name);
    setBackgroundPicture('#backgroundPictureLayer', randomSelect.base64);
    slideData.setting.customBackground.type = 'image';
    slideData.setting.customBackground.base64 = randomSelect.base64;

    // init Available Texture effect
    loadSelectOption('.setupPanel #textureEffectList', window.animationTexture, false);
    $('.setupPanel #textureEffectList').val('Cloud');
    let selectedValue = window.animationTexture.find((el) => el.name == 'Cloud');
    setBackgroundPicture('#backgroundAnimationLayer', selectedValue.base64);
});


// handle for change setting option
$(document).on('click', '.setupBtn', function () {
    $(this).siblings( "#setupPanel" ).toggleClass('active');
    $(this).toggleClass('active');

    $(this).siblings( "#setupPanel2" ).toggleClass('active');
    $(this).toggleClass('active');
});


// Change Gradient background
$(document).on('change', '.setupPanel #backgroundList', function () {
    let selectedValue = window.listBackgroundColor.find((el) => el.name.includes(this.value.substring(4)));
    slideData.setting.background.type = 'gradient';
    slideData.setting.background.color = selectedValue.color;
    $(currentTab+' #backgroundColorLayer').css('background-image', `linear-gradient(to right, ${slideData.setting.background.color[0]}, ${slideData.setting.background.color[1]})`);
});

// Change color Overlay opacity
$(document).on('change', currentTab+' .setupPanel #colorOverlayRange', function () {
    slideData.setting.background.colorOverlayOpacity = $(this).val();
    let opac = $(this).val() + '%';
    $(currentTab+' #backgroundColorLayer').css('Opacity',opac);
    console.log(opac);
});

// Change texture effect opacity
$(document).on('change', currentTab+' .setupPanel #textureEffectRange', function () {
    slideData.setting.background.textureEffectOpactity = $(this).val();
    let opac = $(this).val() + '%';
    $(currentTab+' #backgroundAnimationLayer').css('Opacity',opac);
    console.log(opac);

});

// Change volume rate
$(document).on('change', currentTab+' .setupPanel #volumeRange', function () {
    slideData.setting.background.volumeRate = $(this).val();
    $(currentTab+' #backgroundSlideVideo').prop("volume", this.value);
});

// Change availableBackgroundList
$(document).on('change', currentTab+' .setupPanel #availableBackgroundList', function () {
    destroyMedia();
    console.log('Change availableBackgroundList');
    if (this.value == 'Không chọn') return;
    let selectedValue = window.availablePic.find((el) => el.name == this.value);
    setBackgroundPicture(currentTab+' #backgroundPictureLayer', selectedValue.base64);
    slideData.setting.background.type = 'image';
    slideData.setting.customBackground.type = 'image';
    slideData.setting.customBackground.base64 = selectedValue.base64;
});

// Change availableBackgroundVideoList
$(document).on('change', currentTab+' .setupPanel #availableBackgroundVideoList', function () {
    destroyMedia();
    if (this.value == 'Không chọn') return;
    let selectedValue = window.availableVideo.find((el) => el.name == this.value);
    $(currentTab+' #backgroundSlideVideo').attr('src',`data:video/mp4;base64,${selectedValue.base64}`);
    slideData.setting.background.type = 'video';
});

// Choose Background video/image
$(document).on('change', currentTab+' .setupPanel #inputBackgroundMedia', function () {
    let file = $(this)[0].files[0];
    if (file.size > CONST_MAX_SIZE_ALLOW) {
        alert(ERROR_MAX_SIZE_ALLOW);
        return;
    }
    $(this).val(null);



// Not change to Webp if image is image/gif
if (file.type != 'image/gif' && !file.type.includes(CONST_AUDIO) && !file.type.includes(CONST_VIDEO)) {
    console.log('Convert to Webp');
    // clear current element background
    destroyMedia();
    processFile(file, 0, true);
} else {
    toBase64(file, (base64) => {
        // clear current element background
        destroyMedia();
        if (file.type.includes('video')) {
            $(currentTab+' #backgroundSlideVideo').attr('src',`data:video/mp4;base64,${base64}`);
            slideData.setting.background.type = 'video';
            slideData.setting.customBackground.type = 'video';
            slideData.setting.customBackground.base64 = base64;
        }

        if (file.type.includes('image')) {
            setBackgroundPicture(currentTab+' #backgroundPictureLayer', base64);
            slideData.setting.background.type = 'image';
            slideData.setting.customBackground.type = 'image';
            slideData.setting.customBackground.base64 = base64;

        }
    });
    }
});

// Choose Background audio
$(document).on('change', currentTab+' .setupPanel #inputBackgroundAudio', function () {
    let file = $(this)[0].files[0];
    if (file.size > CONST_MAX_SIZE_ALLOW) {
        alert(ERROR_MAX_SIZE_ALLOW);
        return;
    }
    $(this).val(null);
    toBase64(file, (base64) => {
        // clear current element background
        if (file.type.includes('audio')) {
            $(currentTab+ ' #backgroundSlideAudio').attr('src',`data:audio/ogg;base64,${base64}`);
            slideData.setting.customMusic.type = 'music';
            slideData.setting.customMusic.base64 = base64;
        }
    });
});

// Change texture Effect
$(document).on('change', currentTab+' .setupPanel #textureEffectList', function () {
    if (this.value == 'Không chọn') {
        setBackgroundPicture(currentTab+' #backgroundAnimationLayer', '');
    }
    let selectedValue = window.animationTexture.find((el) => el.name == this.value);
    setBackgroundPicture(currentTab+' #backgroundAnimationLayer', selectedValue.base64);
});

// Destroy media
$(document).on('click', currentTab+' .setupPanel #destroyBackgroundMedia', function () {
    destroyMedia();
});
// Destroy audio
$(document).on('click', currentTab+' .setupPanel #destroyBackgroundAudio', function () {
    $(currentTab+' #backgroundSlideAudio').attr('src',`data:audio/ogg;base64,base64`);
    slideData.setting.customMusic.type = '';
    slideData.setting.customMusic.base64 = '';
});

function destroyMedia(){
    console.log('Destroy background');
    slideData.setting.background.type = '';
    slideData.setting.background.base64 = '';
    $('#backgroundSlideVideo').attr('src','');
    setBackgroundPicture('#backgroundPictureLayer', null);
}

$(document).on('change', '.setupPanel .color', function () {
    $('#slidePage .input-group-text:not(.qNo)').css('color', $(this).val());
    slideData.setting.cell.color = $(this).val();
});

$(document).on('change', '.setupPanel .bgColor', function () {
    $('#slidePage .input-group-text:not(.key)').css('background-color', $(this).val());
    slideData.setting.cell.bgColor = $(this).val();
});

$(document).on('change', '.setupPanel .keyColor', function () {
    $('#slidePage .input-group-text.key').css('background-color', $(this).val());
    slideData.setting.cell.keyColor = $(this).val();
});

$(document).on('click', '#setupPanel #fullscreenbtn', function () {
    toggle_full_screen();
  });