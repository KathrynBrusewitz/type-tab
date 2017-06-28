const textArea = document.getElementById('textArea');
const fakeTextArea = document.getElementById('fakeTextArea');
const fontFace = document.getElementById('fontFace');

const generateLineWidth = (chars) => {
  if (chars < 1) {
    throw new Error();
  }
  let string = new Array(chars).join(' ');
  string += '| \n';
  for (let i = 0; i < 10; i += 1) {
    string += string;
  }
  return string;
};

const saveTextToStorage = () => {
  chrome.storage.sync.set({ notes: textArea.value }, () => {
    // console.log('All changes saved');
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
    fontSize: '14',
    fontFamily: 'Roboto',
    lineHeight: '1.5',
    enableLineWidth: false,
    spellcheck: false,
    backgroundImageURL: '',
  }, (res) => {
    fontFace.href = `https://fonts.googleapis.com/css?family=${res.fontFamily.split(' ').join('+')}`;
    Object.assign(textArea.style, {
      color: `#${res.fontColor}`,
      fontSize: `${res.fontSize}px`,
      fontFamily: `${res.fontFamily}, sans-serif`,
      lineHeight: `${res.lineHeight}rem`,
    });
    textArea.spellcheck = res.spellcheck;
    if (res.enableLineWidth) {
      fakeTextArea.value = generateLineWidth(80); // this needs to become a line
      Object.assign(fakeTextArea.style, {
        fontSize: `${res.fontSize}px`,
        fontFamily: `${res.fontFamily}, sans-serif`,
        lineHeight: `${res.lineHeight}rem`,
      });
    }
    document.body.style.backgroundColor = `#${res.backgroundColor}`;
    if (res.backgroundImageURL.length > 0) {
      document.body.style.backgroundImage = `url(${res.backgroundImageURL})`;
    }
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
