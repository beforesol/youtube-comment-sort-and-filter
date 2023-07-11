import MainController from "./controllers/MainController.js";

document.addEventListener('DOMContentLoaded', () => {
    // 현재 활성 탭의 정보를 가져옴
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // 현재 활성 탭의 URL을 가져옴
        const currentUrl = tabs[0].url;

        // videoId 추출 함수
        function getVideoId(url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            return urlParams.get("v");
        }

        // videoId 추출
        const videoId = getVideoId(currentUrl);

        new MainController(videoId);
    });
})