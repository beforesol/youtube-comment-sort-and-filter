import { CHROME_ACTION } from './contants/action.js';

// log
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === CHROME_ACTION.LOG) {
    const receivedData = message.data;

    console.log(receivedData);
  }
});

// timeline
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === CHROME_ACTION.LINK) {
    const href = message.data;

    window.location.href = href
  }
});