// log
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'log') {
    const receivedData = message.data;

    console.log(receivedData);
  }
});

// timeline
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'link') {
    const href = message.data;

    window.location.href = href
  }
});