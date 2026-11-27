const attachments = document.getElementById('brief-attachments');
const inputs = [...attachments.querySelectorAll('input[type="file"]')];
const limit = 7_000_000;
const sizeMessage = document.getElementById('attachment-size');

function sizeOf(files) {
  return files.reduce((total, file) => total + file.size, 0);
}

function validateAttachments() {
  const size = sizeOf(inputs.flatMap(input => [...input.files]));
  const error = size > limit ? 'Attachments are over 7 MB. Remove a file or pick a smaller version.' : '';
  inputs[0].setCustomValidity(error);
  sizeMessage.textContent = error || (size ? (size / 1_000_000).toFixed(2) + ' MB attached.' : '');
  return !error;
}

inputs.forEach(input => input.addEventListener('change', validateAttachments));
inputs[0].addEventListener('invalid', () => { attachments.open = true; });
attachments.closest('form').addEventListener('submit', event => {
  if (validateAttachments()) return;
  event.preventDefault();
  attachments.open = true;
  inputs[0].reportValidity();
});

if (navigator.mediaDevices?.getDisplayMedia && globalThis.MediaRecorder && globalThis.DataTransfer) {
  enableRecorder();
}

function enableRecorder() {
  const container = document.getElementById('screen-recorder');
  const start = document.getElementById('record-start');
  const stop = document.getElementById('record-stop');
  const attach = document.getElementById('record-attach');
  const remove = document.getElementById('record-remove');
  const preview = document.getElementById('record-preview');
  const status = document.getElementById('record-status');
  const recording = document.getElementById('screen-recording');
  let clip;
  let previewUrl;

  function clearClip() {
    clip = undefined;
    recording.value = '';
    attach.hidden = remove.hidden = preview.hidden = true;
    preview.removeAttribute('src');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = undefined;
    validateAttachments();
  }

  attach.addEventListener('click', () => {
    const otherSize = sizeOf(inputs.filter(input => input !== recording).flatMap(input => [...input.files]));
    if (otherSize + clip.size > limit) {
      status.textContent = 'This recording and your files exceed 7 MB. Remove a file or make a shorter recording.';
      return;
    }
    const transfer = new DataTransfer();
    transfer.items.add(clip);
    recording.files = transfer.files;
    attach.hidden = true;
    status.textContent = 'Recording attached. It will be sent with your inquiry.';
    validateAttachments();
    remove.focus();
  });
  remove.addEventListener('click', () => {
    clearClip();
    status.textContent = 'Recording removed.';
    start.focus();
  });

  start.addEventListener('click', async () => {
    start.disabled = true;
    let stream;
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: { ideal: 1280 }, frameRate: { ideal: 12, max: 15 } },
        audio: false,
      });
      const recorder = new MediaRecorder(stream, { videoBitsPerSecond: 900_000 });
      const chunks = [];
      let timedOut;
      let failure = false;

      function stopCapture() {
        if (recorder.state !== 'inactive') recorder.stop();
        stream.getTracks().forEach(track => track.stop());
      }

      clearClip();
      recorder.addEventListener('dataavailable', event => {
        if (event.data.size) chunks.push(event.data);
      });
      recorder.addEventListener('error', () => {
        failure = true;
        stopCapture();
      });
      recorder.addEventListener('stop', () => {
        clearTimeout(timedOut);
        stopCapture();
        start.disabled = false;
        stop.hidden = true;
        stop.onclick = null;
        if (failure || !chunks.length) {
          status.textContent = 'A recording could not be saved. Try again or attach a video file.';
          start.focus();
          return;
        }
        const type = recorder.mimeType.split(';')[0] || chunks[0].type.split(';')[0] || 'video/webm';
        clip = new File(chunks, type.includes('mp4') ? 'screen-recording.mp4' : 'screen-recording.webm', { type });
        previewUrl = URL.createObjectURL(clip);
        preview.src = previewUrl;
        preview.hidden = attach.hidden = remove.hidden = false;
        status.textContent = 'Recording ready. Preview it and choose whether to attach it.';
        attach.focus();
      }, { once: true });
      stream.getVideoTracks()[0].addEventListener('ended', stopCapture, { once: true });
      recorder.start();
      stop.onclick = stopCapture;
      stop.hidden = false;
      stop.focus();
      status.textContent = 'Recording now. It stops automatically after 30 seconds.';
      timedOut = setTimeout(stopCapture, 30_000);
    } catch {
      stream?.getTracks().forEach(track => track.stop());
      start.disabled = false;
      status.textContent = 'Screen recording did not start. Try again or attach an existing video.';
    }
  });
  container.hidden = false;
}
