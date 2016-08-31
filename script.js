var text;

document.body.onload = function() {
  chrome.storage.sync.get("data", function(object) {
    if (!chrome.runtime.error) {
      text = object.data;
    } else {
      text = "";
    }
    document.getElementById("textArea").value = text;
  });

  window.setInterval(function() {
    if (text !== document.getElementById("textArea").value) {
      saveText();
      text = document.getElementById("textArea").value;
      console.log("saved changes");
    }
  }, 3000);
}

var saveText = function() {
  text = document.getElementById("textArea").value;
  chrome.storage.sync.set({ "data" : text }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
};