const message_error_micNotFound = 'Không tìm thấy thiết bị thu âm trên máy tính';
const message_error_cameraNotFound = 'Không tìm thấy thiết bị ghi hình trên máy tính';

const RecordingUtilitiesPlaceHolder = `
  <!-- Record pannel -->
  <div id="RecordingUtilities_RecordingPanel"></div>
  <!-- /Record pannel -->
`;

const RecordingUtilities_RecordingPanel_UI = `
<div id="coverBackground" class="d-none"></div>
<div id="recVideoModal" class="d-none">
  <video id="recording" controls="" class="d-none"></video>
  <video id="preview" autoplay="" muted=""></video>
  <div class="recordingIcon d-none"> <span><strong class="text-info">REC</strong></span> <span class="circle"></span></div>
  <span class="recBtnPos recBtn"></span>
  <button id="recVideo" type="button" class="recBtnPos startBtn"></button>
  <button id="stopRecVideo" type="button" class="recBtnPos stopBtn"></button>
</div>
<div id="recAudioModal" class="d-none">
  <audio id="preStreamAudio" controls autoplay muted style="pointer-events:none"></audio>
  <audio id="recordedAudio" controls class="d-none"></audio>
  <span class="recBtnPos recBtn"></span>
  <button id="recAudio" type="button" class="recBtnPos startBtn"></button>
  <button id="stopRecAudio" type="button" class="recBtnPos stopBtn"></button>
</div>
`;

const RecordingUtilities_questionFilePanel_UI = `
<div class="form-group questionFile">
<ul>
<li> <i class="fa-solid fa-microphone openRecordAudioModal mediaIcon" title="Thêm bản ghi âm từ micro"></i></li>
<li> <i class="fa-solid fa-video openRecordVideoModal mediaIcon" title="Thêm video từ webcam"></i></li>
<li>
  <label class="uploadBtn mediaIcon">
    <input class="uploadFile" type="file" accept="image/*">
    <i class="fa-solid fa-file-image" title="Thêm ảnh"></i>
  </label>
</li>
<li>
  <label class="uploadBtn mediaIcon">
    <input class="uploadFile" type="file" accept="video/*">
    <i class="fa-solid fa-file-video" title="Thêm video"></i>
  </label>
</li>
<li>
  <label class="uploadBtn mediaIcon">
    <input class="uploadFile" type="file" accept="audio/*">
    <i class="fa-solid fa-file-audio" title="Thêm nhạc"></i>
  </label>
</li>
<li>
  <label class="uploadBtn mediaIcon">
    <i id="cancelQuestionFile" class="fa-solid fa-ban mediaIcon" title="Hủy media"></i>
  </label>
</li>
<li class="questionFileName"></li>
</ul>
</div>
`;

$(document).ready(function () {

  if($('#RecordingUtilities_RecordingPanel').length == 0) {
    $('body').append(RecordingUtilitiesPlaceHolder);
  }

  // Inject All facilities
  $('#RecordingUtilities_RecordingPanel').html(RecordingUtilities_RecordingPanel_UI);

  //media player and record
  let preview = document.getElementById('preview');
  let recording = document.getElementById('recording');
  async function startRecording(stream) {
    let recorder = new MediaRecorder(stream);
    let data = [];
    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.name);
    });
    await Promise.all([stopped]);
    return data;
  }

  function stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  $(document).on('click', '.openRecordVideoModal', function () {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        $('#coverBackground').removeClass('d-none').attr('type', 'video');
        $('#recVideoModal').removeClass('d-none').attr('questionid', $(this).parents('.question').index());
        preview.srcObject = stream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;
        return new Promise((resolve) => (preview.onplaying = resolve));
      });
  });

  $(document).on('click', '#recVideo', function () {
    $(this).toggleClass('d-none');
    $('.recordingIcon').removeClass('d-none');
    startRecording(preview.captureStream()).then((recordedChunks) => {
      let recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      recording.src = URL.createObjectURL(recordedBlob);
      var reader = new FileReader();
      reader.readAsDataURL(recordedBlob);
      reader.onloadend = function () {
        var base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
        slideData.data[$('#recVideoModal').attr('questionid')].file = { type: 'video', base64 };
      };
    });
  });

  $(document).on('click', '#stopRecVideo', function () {
    stop(preview.srcObject);
    $('.recordingIcon').addClass('d-none');
    $('#recording').toggleClass('d-none');
    $('#preview').toggleClass('d-none');
    $('.recBtn').toggleClass('d-none');
    $('.stopBtn').toggleClass('d-none');
    $('#questionList > .question').eq($('#recVideoModal').attr('questionid')).find('.fileName').html('Bản ghi hình');
  });

  //Close record modal
  $(document).on('click', '#coverBackground', function () {
    if ($(this).attr('type') == 'video') {
      stop(preview.srcObject);
      $('.recordingIcon').addClass('d-none');
      if (!$('#recording').hasClass('d-none')) $('#recording').addClass('d-none');
      if ($('#preview').hasClass('d-none')) $('#preview').removeClass('d-none');
      $('#coverBackground').addClass('d-none');
      $('#recVideoModal').addClass('d-none');
    }
    if ($(this).attr('type') == 'audio') {
      if (preStreamAudio.srcObject != null) stop(preStreamAudio.srcObject);
      if (!$('#recordedAudio').hasClass('d-none')) $('#recordedAudio').addClass('d-none');
      $('#coverBackground').addClass('d-none');
      $('#recAudioModal').addClass('d-none');
    }
    if ($('.recBtn').hasClass('d-none')) $('.recBtn').removeClass('d-none');
    if ($('.startBtn').hasClass('d-none')) $('.startBtn').removeClass('d-none');
    if ($('.stopBtn').hasClass('d-none')) $('.stopBtn').removeClass('d-none');
  });

  //audio record
  let preStreamAudio = document.getElementById('preStreamAudio');
  let recordedAudio = document.getElementById('recordedAudio');
  function startRecAudio(stream) {
    let recorder = new MediaRecorder(stream);
    let data = [];
    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.name);
    });
    return Promise.all([stopped]).then(() => data);
  }

  $(document).on('click', '.openRecordAudioModal', function () {
    $('#coverBackground').removeClass('d-none').attr('type', 'audio');
    $('#recAudioModal').removeClass('d-none').attr('questionid', $(this).parents('.question').index());
  });

  $(document).on('click', '#recAudio', function () {
    let id = $(this).parent()[0].getAttribute('questionid');
    $(this).toggleClass('d-none');
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        preStreamAudio.srcObject = stream;
        startRecAudio(stream).then((recordedChunks) => {
          let recordedBlob = new Blob(recordedChunks, { type: 'audio/mp3' });
          recordedAudio.src = URL.createObjectURL(recordedBlob);
          var reader = new FileReader();
          reader.readAsDataURL(recordedBlob);
          reader.onloadend = function () {
            var base64 = reader.result.replace('data:', '').replace(/^.+,/, '');
            slideData.data[id].file = { type: 'audio', base64 };
          };
        });
      });
  });

  $(document).on('click', '#stopRecAudio', function () {
    stop(preStreamAudio.srcObject);
    $('#recordedAudio').toggleClass('d-none');
    $('.recBtn').toggleClass('d-none');
    $('.stopBtn').toggleClass('d-none');
    $('#questionList > .question').eq($('#recAudioModal').attr('questionid')).find('.fileName').html('Bản ghi âm');
  });

  //get file from mediaPanel and save file as base64
  $(document).on('change', '.RecordingUtilities_questionFilePanel .uploadFile', function () {
    let file = $(this)[0].files[0];
    if (file.size > CONST_MAX_SIZE_ALLOW) {
      alert(ERROR_MAX_SIZE_ALLOW);
      return;
    }
    let currentQuestion = $(this).parents('.question').index();

    const fileType = file['type'];
    // Not change to Webp if image is image/gif
    if (fileType != 'image/gif' && !file.type.includes(CONST_AUDIO) && !file.type.includes(CONST_VIDEO)) {
      console.log('Convert to Webp');
      processFile(file, currentQuestion);
    } else {
      toBase64(file, (base64) => {
        slideData.data[currentQuestion].file = { name: file.name, type: file.type.replace(/(.+)(\/.+)/, '$1'), base64 };
      });
    }

    $(this).parent().parent().siblings('.questionFileName').html(file.name);
    $(this)[0].value = null;
  });

  // destroy media file of question
  $(document).on('click', '.RecordingUtilities_questionFilePanel #cancelQuestionFile', function () {
    let currentQuestion = $(this).parents('.question').index();
    slideData.data[currentQuestion].file = {};
    $(this).parent().parent().siblings('.questionFileName').html('');

  });

  function processFile(file, curques) {
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
        slideData.data[curques].file = { name: file.name, type: file.type.replace(/(.+)(\/.+)/, '$1'), base64:output };
      });
  }
  
});