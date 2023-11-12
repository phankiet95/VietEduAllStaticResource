function toBase64(file, onload) {
    var reader = new FileReader();
    reader.onload = function () {
        var base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
        onload(base64);
    };
    reader.readAsDataURL(file);
}

// loadSelectOption params
// selector : string
// data : json
// addNumber : boolean
function loadSelectOption(selector, data, addNumber){
    if (addNumber) {
        let i = 0;
        let content;
        data.forEach(({name, notOption}) => {
            if (notOption) {
                content = `<option disabled>${name}</option>`;
            } else {
                content = `<option>${++i}. ${name}</option>`;
            }
            $(selector).append(content);
        });
    } else {
        let content;
        data.forEach(({name, notOption}) => {
            if (notOption) {
                content = `<option disabled>${name}</option>`;
            } else {
                content = `<option>${name}</option>`;
            }
            $(selector).append(content);
        });
    }
}

function getRandomOption(data){
    let max = data.length-1;
    let randomVal = Math.floor(Math.random() * max) + 1;
    if (data[randomVal].notOption) {
        randomVal++;
    }
    return data[randomVal];
}


// setBackgroundPictureLayer params
// selector : string
// base64 : base64
function setBackgroundPicture(selector, base64){
    if (base64) {
        $(selector).css('background-image', 'url(' + `data:image/gif;base64,${base64}` + ')');

    } else {
        $(selector).css('background-image', '');
    }
}

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