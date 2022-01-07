
const sortByLike = () => {
  const isYoutube = window.location.hostname + window.location.pathname === 'www.youtube.com/watch';
  if (!isYoutube) {
    alert('유튜브 재생 페이지에서 사용해주세요.');
    return;
  }

  const findCommentContainer = new Promise((resolve) => {
    let id;
    const animation = () => {
      const commentContainer = document.querySelector('ytd-comments#comments #contents');

      if (commentContainer) {
        cancelAnimationFrame(id);
        resolve();
      } else {
        const contentHeight = document.querySelector('#content').scrollHeight;
        window.scrollTo(0, contentHeight);
        window.requestAnimationFrame(animation);
      }
    }
    id = window.requestAnimationFrame(animation);
  })

  const findAllComments = new Promise((resolve) => {
    const commentLengthList = [];

    let id = setInterval(() => {
      const contentHeight = document.querySelector('#content').scrollHeight;
      const comments = document.querySelectorAll('ytd-comment-thread-renderer');
      window.scrollTo(0, contentHeight);
      commentLengthList.push(comments.length);

      const length = commentLengthList.length;
      if (commentLengthList[length - 1] === commentLengthList[length - 2] && commentLengthList[length - 2] === commentLengthList[length - 3]) {
        clearInterval(id);
        resolve();
      } else {
        console.log(`${comments.length}개의 댓글 파싱 중..`)
      }
    }, 1000);
  })

  Promise.all([findCommentContainer, findAllComments]).then(() => {
    const commentContainer = document.querySelector('ytd-comments#comments #contents');
    const comments = document.querySelectorAll('ytd-comment-thread-renderer');
    const orderByLike = Array.from(comments).sort((a, b) => {
      return Number(b.querySelector('#vote-count-middle').textContent) - Number(a.querySelector('#vote-count-middle').textContent);
    })
    commentContainer.innerHTML = '';
    orderByLike.forEach(item => commentContainer.appendChild(item));

    window.scrollTo(0, 2920);
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