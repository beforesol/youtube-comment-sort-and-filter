const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];
    chrome.tabs.sendMessage(tab.id, { action: 'getDOM' });
  });
});