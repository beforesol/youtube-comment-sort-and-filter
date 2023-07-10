import { getPeriodTimeStringForClip } from '../utils/periodTime.js';
import View from './View.js';

const ELLIPSIS_HEIGHT = 78;

class CommentView extends View {
  constructor(el) {
    super(el);

    this.commentContainerEl = this.el.querySelector('[data-component="comment-container"]');
    this.backBtnEl = this.el.querySelector('[data-button-type="back"]');
    this.bindEvents();
    this.hide()

    return this;
  }

  bindEvents = () => {
    this.backBtnEl.addEventListener('click', this.onBack);
    this.commentContainerEl.addEventListener('click', this.onClick)
  }

  onBack = () => {
    this.hide()
  }

  removeEllipsis(e) {
    const moreBtnEl = e.target.closest('[data-button-type="more-btn"]');

    if (moreBtnEl) {
      const commentEl = moreBtnEl?.previousElementSibling

      moreBtnEl.remove()
      commentEl.classList.remove('ellipsis')
    }
  }

  onClick = (e) => {
    this.removeEllipsis(e);
  }

  getCommentsHtml = (data) => {
    return data.reduce((html, item) => {
      const { totalReplyCount } = item;
      const { authorDisplayName, authorProfileImageUrl, textDisplay, likeCount, publishedAt } = item.topLevelComment.snippet

      html +=
        `<li class="list">
          <div class="user_img_thumb">
              <img class="user_img" src='${authorProfileImageUrl}'>
          </div>
          <div class="user_comment_wrap">
              <div>
                  <span class="user_name">${authorDisplayName}</span>
                  <span class="past_time">${getPeriodTimeStringForClip(publishedAt)}</span>
              </div>
              <div class="comment_wrap">
                  <p class="comment" data-component="comment-item">${textDisplay}</p>
              </div>

              <div class="score_area">
                  <div class="score">
                      <span class="score_thumb like"><span class="blind">like</span></span>
                      <span class="score_num">${likeCount}</span>
                  </div>
                  <div class="score">
                      <span class="score_thumb reply"><span class="blind">reply</span></span>
                      <span class="score_num">${totalReplyCount}</span>
                  </div>
              </div>
            </div>
         </li>`

      return html;
    }, '')
  }

  render = (data) => {
    this.show();
    this.commentContainerEl.innerHTML = this.getCommentsHtml(data)
    const commentElList = this.commentContainerEl.querySelectorAll('[data-component="comment-item"]')

    for (const comment of commentElList) {
      if (comment.getBoundingClientRect().height > ELLIPSIS_HEIGHT) {
        const moreBtn = document.createElement('button')
        moreBtn.classList.add('more_btn')
        moreBtn.innerHTML = '<span class="text">...more</span>'
        moreBtn.dataset.buttonType="more-btn"

        comment.classList.add('ellipsis');
        comment.parentNode.append(moreBtn);
      }
    }
  }
}

export default CommentView;
