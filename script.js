const textArea = document.getElementById('textArea');

const saveTextToStorage = () => {
  chrome.storage.sync.set({ notes: textArea.value }, () => {
    console.log('All changes saved');
  });
};

const startAutoSaving = () => {
  let prevText = textArea.value;
  setInterval(() => {
    if (prevText !== textArea.value) {
      saveTextToStorage();
      prevText = textArea.value;
    }
  }, 2000);
};

const loadOptions = () => {
  // Defaults
  chrome.storage.sync.get({
    backgroundColor: 'fcfcfc',
    fontColor: '2b2b2b',
  }, (res) => {
    Object.assign(textArea.style, {
      backgroundColor: `#${res.backgroundColor}`,
      color: `#${res.fontColor}`,
    });
    Object.assign(document.body.style, {
      backgroundColor: `#${res.backgroundColor}`,
    });
  });
};

const loadNotes = () => {
  // Default
  chrome.storage.sync.get({ notes: 'Start writing! (By the way, you can change the background and font in the options menu...)' }, (res) => {
    textArea.value = res.notes;
    startAutoSaving();
  });
};

document.body.onload = () => {
  loadNotes();
  loadOptions();
};
