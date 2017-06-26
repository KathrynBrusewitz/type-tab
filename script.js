const saveText = () => {
  const text = document.getElementById('textArea').value;
  chrome.storage.sync.set({ notes: text }, () => {
    console.log('Saved notes');
  });
};

const startSaveInterval = ((text) => {
  let prevText = text;
  setInterval(() => {
    if (prevText !== document.getElementById('textArea').value) {
      saveText();
      prevText = document.getElementById('textArea').value;
    }
  }, 2000);
});

document.body.onload = () => {
  chrome.storage.sync.get({ notes: 'Start writing...' }, (res) => {
    document.getElementById('textArea').value = res.notes;
    startSaveInterval(res.notes);
  });
};
