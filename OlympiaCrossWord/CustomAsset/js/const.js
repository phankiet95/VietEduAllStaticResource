// Leave window.mediaPanel empty if game don't need questionMediaFile
window.questionFilePanel = `<div class="RecordingUtilities_questionFilePanel">${RecordingUtilities_questionFilePanel_UI}</div>`;
window.questionPanel = `<div class="question"><div><div class="input-group mr-sm-2"><div class="input-group-prepend"><div class="input-group-text"><strong>1</strong></div></div><textarea class="form-control inputQuestion" placeholder="Câu hỏi"></textarea></div></div><div class="mt-2"><div class="input-group mb-2 mr-sm-2"><input type="text" class="form-control inputAnswer" placeholder="Đáp án"></div>${window.questionFilePanel}`;
window.answerPanel = '<div class="d-block input-group-text letterBox" style="line-height: px; width: px; height: px; font-size: px; border-radius: 5px; "><strong class="char"></strong></div>';
window.slideData = {
  font: { fontFamily: 'Arial', fontSize: 40 },
  data: [],
  setting: {
    background: { type: 'gradient', color: ['#c2e9fb', '#a1c4fd'], colorOverlayOpacity : 30, textureEffectOpactity : 50, volumeRate : 0.8, defaultColor:true, defaultBackground:true },
    countdown: { type: 0, second: 30 },
    cell: { color: '#ffffff', bgColor: '#131477', keyColor: '#ff7062' },
    mouse: { cursor: '', effect: '' },
    gameinfo : { name: 'Olympia Crossword'},
    customBackground: {type: '', base64:''},
    customMusic: {type: '', base64:''},
  },
};

window.cellSize = parseInt(slideData.font.fontSize + 10);