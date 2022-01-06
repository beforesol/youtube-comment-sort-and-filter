let findCommentContainer = new Promise((resolve) => {
  let id;
  let animation = () => {
    let commentContainer = document.querySelector('ytd-comments#comments #contents');

    if (commentContainer) {
      cancelAnimationFrame(id);
      resolve();
    } else {
      let contentHeight = document.querySelector('#content').scrollHeight;
      window.scrollTo(0, contentHeight);
      window.requestAnimationFrame(animation);
    }
  }
  id = window.requestAnimationFrame(animation);
})

let findAllComments = new Promise((resolve) => {
  let commentLengthList = [];

  let id = setInterval(() => {
    let contentHeight = document.querySelector('#content').scrollHeight;
    let comments = document.querySelectorAll('ytd-comment-thread-renderer');
    window.scrollTo(0, contentHeight);
    commentLengthList.push(comments.length);

    let length = commentLengthList.length;
    if (commentLengthList[length - 1] === commentLengthList[length - 2] && commentLengthList[length - 2] === commentLengthList[length - 3]) {
      clearInterval(id);
      resolve();
    } else {
      console.log(`${comments.length}개의 댓글 파싱 중..`)
    }
  }, 1000);
})

Promise.all([findCommentContainer, findAllComments]).then(() => {
  let commentContainer = document.querySelector('ytd-comments#comments #contents');
  let comments = document.querySelectorAll('ytd-comment-thread-renderer');
  let orderByLike = Array.from(comments).sort((a, b) => {
    return Number(b.querySelector('#vote-count-middle').textContent) - Number(a.querySelector('#vote-count-middle').textContent);
  })
  commentContainer.innerHTML = '';
  orderByLike.forEach(item => commentContainer.appendChild(item));
  window.scrollTo(0, 0);
  console.log('----*****댓글 좋아요 순으로 정렬 완료*****----')
})

