const backgroundHolder = `
    <video id="backgroundSlideVideo" autoplay="autoplay" loop class="backgroundSlideVideo"></video>
    <div id="backgroundPictureLayer" class="backgroundPictureLayer" ></div>
    <div id="backgroundColorLayer" class="backgroundColorLayer" ></div>
    <div id="backgroundAnimationLayer" class="Cloud"></div>
`;

let currentTab = '';
$(document).ready(function () {
    $(document).tooltip({show: {effect:"none", delay:0}});
    /* horizontal Navigation */
    $(document).on('click', '#horizontalNavigation #nav_composerPanel', function () {
        showTab('#tab_composerPanel');
        currentTab = '#tab_composerPanel';
        $('#nav_importGameMenu').show();
    });

    $(document).on('click', '#horizontalNavigation #nav_slideshowPanel', function () {
        showTab('#tab_SlideShowPanel');
        currentTab = '#tab_SlideShowPanel';
        $('#nav_importGameMenu').hide();

    });

    $(document).on('click', '#horizontalNavigation #nav_introPanel', function () {
        showTab('#tab_introPanel');
        currentTab = '#tab_introPanel';
    });

    // change status on UI
    $('#horizontalNavigation>li:not(#nav_importGameMenu, #nav_exportGame)').bind({
        click: function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        },
    });
    /* horizontal Navigation */


    /* gameConfigurationBar */
    $(document).on('change', '#config_countdown', function () {
        console.log('change countdown ',this.value );
        window.slideData.setting.countdown.second = this.value;
        $('#countdown').text(slideData.setting.countdown.second);

    });

    $(document).on('change', '#config_fontFamily', function () {
        window.slideData.font.fontFamily = this.value;
    });

    $(document).on('change', '#config_fontSize', function () {
        window.slideData.font.fontFamily = this.value;
    });
    /* gameConfigurationBar */

    /* Slide Show tab */
    $('.slideShow_BackgroundHolder').append(backgroundHolder);
    /* Slide Show tab */

});

function showTab(selector) {
    $('#tab_composerPanel').hide();
    $('#tab_SlideShowPanel').hide();
    $('#tab_introPanel').hide();
    $(selector).show();
}

// prevent rightclick
document.addEventListener("contextmenu", function (e){
    e.preventDefault();
}, false);