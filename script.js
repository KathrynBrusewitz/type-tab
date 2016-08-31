var text;

document.body.onload = function() {
  chrome.storage.sync.get(["data", "date"], function(object) {
    if (!chrome.runtime.error) {
      text = object.data;
    } else {
      text = "";
    }
    document.getElementById("textArea").value = text;
  });

  window.setInterval(function() {
    if (text !== document.getElementById("textArea").value) {
      console.log("setInterval called");
      saveText();
      text = document.getElementById("textArea").value;
      console.log("saved changes");
    }
  }, 3000);

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];
      document.getElementById("textArea").value = storageChange.newValue;
    }
  });
}

var saveText = function() {
  text = document.getElementById("textArea").value;
  chrome.storage.sync.set({ "data" : text }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
};