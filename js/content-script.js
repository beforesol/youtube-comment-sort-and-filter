const sortByLike = () => {
  const PAGE_CONTAINER_SELECTOR = '#content'
  const COMMENT_CONTAINER_SELECTOR = 'ytd-comments#comments #contents'
  const COMMENT_SELECTOR = 'ytd-comment-thread-renderer'
  const LIKE_COUNT_SELECTOR = '#vote-count-middle'

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
        resolve(commentList);
      } else {
        console.log(`${commentList.length}개의 댓글 파싱 중..`)
      }
    }, 1000);
  })

  Promise.all([findCommentContainer, findAllCommentList]).then(([commentContainer, commentList]) => {
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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'log') {
    const receivedData = message.data;
    // 수신된 데이터를 처리하는 로직 작성
    console.log(receivedData);
  }
});