const backgroundColor = document.getElementById('backgroundColor');
const fontColor = document.getElementById('fontColor');
const fontSize = document.getElementById('fontSize');
const fontFamily = document.getElementById('fontFamily');
const lineHeight = document.getElementById('lineHeight');
const enableLineWidth = document.getElementById('enableLineWidth');
const spellcheck = document.getElementById('spellcheck');
const backgroundImageURL = document.getElementById('backgroundImageURL');
const status = document.getElementById('status');

// Save options to chrome.storage.sync
const saveOptions = () => {
  chrome.storage.sync.set({
    backgroundColor: backgroundColor.value,
    fontColor: fontColor.value,
    fontSize: fontSize.value,
    fontFamily: fontFamily.value,
    lineHeight: lineHeight.value,
    enableLineWidth: enableLineWidth.checked,
    spellcheck: spellcheck.checked,
    backgroundImageURL: backgroundImageURL.value,
  }, () => {
    // Let user know options were saved
    status.textContent = 'Settings have been saved.';
    status.classList.add('status-save');
    status.style.visibility = 'visible';
    setTimeout(() => {
      status.textContent = '';
      status.style.visibility = 'hidden';
      status.classList.remove('status-save');
    }, 4000);
  });
};

// Reset options to defaults
const resetOptions = () => {
  backgroundColor.value = 'fcfcfc';
  fontColor.value = '2b2b2b';
  fontSize.value = '14';
  fontFamily.value = 'Roboto';
  lineHeight.value = '1.5';
  enableLineWidth.checked = false;
  spellcheck.checked = false;
  backgroundImageURL.value = '';
  Object.assign(backgroundColor.style, {
    backgroundColor: `#${backgroundColor.value}`,
  });
  Object.assign(fontColor.style, {
    backgroundColor: `#${fontColor.value}`,
  });
  // Let user know options were reset
  status.textContent = 'Settings have been reset. Remember to save your changes.';
  status.classList.add('status-reset');
  status.style.visibility = 'visible';
  setTimeout(() => {
    status.textContent = '';
    status.style.visibility = 'hidden';
    status.classList.remove('status-reset');
  }, 4000);
};

// Restore option states using the preferences stored in chrome.storage
const restoreOptions = () => {
  // Defaults
  chrome.storage.sync.get({
    backgroundColor: 'fcfcfc',
    fontColor: '2b2b2b',
    fontSize: '14',
    fontFamily: 'Roboto',
    lineHeight: '1.5',
    enableLineWidth: false,
    spellcheck: false,
    backgroundImageURL: '',
  }, (res) => {
    backgroundColor.value = res.backgroundColor;
    fontColor.value = res.fontColor;
    fontSize.value = res.fontSize;
    fontFamily.value = res.fontFamily;
    lineHeight.value = res.lineHeight;
    enableLineWidth.checked = res.enableLineWidth;
    spellcheck.checked = res.spellcheck;
    backgroundImageURL.value = res.backgroundImageURL;
    Object.assign(backgroundColor.style, {
      backgroundColor: `#${res.backgroundColor}`,
    });
    Object.assign(fontColor.style, {
      backgroundColor: `#${res.fontColor}`,
    });
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);
