const sortByLike = () => {
  const PAGE_CONTAINER_SELECTOR = '#content'
  const COMMENT_CONTAINER_SELECTOR = 'ytd-comments#comments #contents'
  const COMMENT_SELECTOR = 'ytd-comment-thread-renderer'
  const LIKE_COUNT_SELECTOR = '#vote-count-middle'

  const YOUTUBE_WATCH_URL = 'www.youtube.com/watch'

  const isYoutubeWatchPage = `${window.location.hostname}${window.location.pathname}` === YOUTUBE_WATCH_URL;
  if (!isYoutubeWatchPage) {
    alert('유튜브 재생 페이지에서 사용해주세요.');
    return;
  }

  const findCommentContainer = new Promise((resolve) => {
    let id;
    const animation = () => {
      const commentContainer = document.querySelector(COMMENT_CONTAINER_SELECTOR);

      if (commentContainer) {
        cancelAnimationFrame(id);
        resolve(commentContainer);
      } else {
        const contentHeight = document.querySelector(PAGE_CONTAINER_SELECTOR).scrollHeight;

        window.scrollTo(0, contentHeight);
        window.requestAnimationFrame(animation);
      }
    }
    id = window.requestAnimationFrame(animation);
  })

  const findAllCommentList = new Promise((resolve) => {
    const commentLengthList = [];

    let id = setInterval(() => {
      const contentHeight = document.querySelector(PAGE_CONTAINER_SELECTOR).scrollHeight;
      const commentList = document.querySelectorAll(COMMENT_SELECTOR);

      window.scrollTo(0, contentHeight);
      commentLengthList.push(commentList.length);

      const {length} = commentLengthList;
      const isScrollEnd = commentLengthList[length - 1] === commentLengthList[length - 2] && commentLengthList[length - 2] === commentLengthList[length - 3]

      if (isScrollEnd) {
        clearInterval(id);
        resolve();
      } else {
        console.log(`${commentList.length}개의 댓글 파싱 중..`)
      }
    }, 1000);
  })

  Promise.all([findCommentContainer, findAllCommentList]).then(() => {
    const commentContainer = document.querySelector(COMMENT_CONTAINER_SELECTOR);
    const commentList = document.querySelectorAll(COMMENT_SELECTOR);
    const orderByLike = Array.from(commentList).sort((a, b) => {
      return Number(b.querySelector(LIKE_COUNT_SELECTOR).textContent) - Number(a.querySelector(LIKE_COUNT_SELECTOR).textContent);
    })
    commentContainer.innerHTML = '';
    orderByLike.forEach(item => commentContainer.appendChild(item));

    commentContainer.scrollIntoView();
    console.log('----*****댓글 좋아요 순으로 정렬 완료*****----')
    alert('댓글 정렬 완료')
  })
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: sortByLike
  });
});