// $(document).on('keypress',function(e) {
//     if(e.which == 13) {
//         jQuery('#introPanelContent').toggle('slide', {direction: 'left'}, 1000);

//         $('#nav_slideshowPanel').click();
//         // Go Play
//     }
//     if(e.which == 32) {
//         jQuery('#introPanelContent').toggle('slide', {direction: 'left'}, 1000);
//     }
// });

document.addEventListener('keydown', function(e) {
    if(currentTab == '#tab_introPanel') {
        switch (e.keyCode) {
            case 38:
                jQuery('#introPanelContent').toggle('slide', {direction: 'left'}, 1000);
                setTimeout(() => { $('#nav_slideshowPanel').click(); }, 1000);
                break;
            case 39: //Right
                jQuery('#introPanelContent').toggle('slide', {direction: 'left'}, 1000);
                break;
        }
    }

});

$(document).on('click', '#gameintroStart', function () {
    jQuery('#introPanelContent').toggle('slide', {direction: 'left'}, 1000);
    setTimeout(() => { $('#nav_slideshowPanel').click(); }, 1000);
    
  });


