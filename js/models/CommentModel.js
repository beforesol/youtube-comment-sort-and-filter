import { API_KEY, YOUTUBE_COMMENT_API_URL } from '../contants/API.js';

export default {
  originalData: [],
  data: [],
  fetchComment(videoId, pageToken) {
    const params = {
      key: API_KEY,
      part: 'snippet',
      videoId,
      maxResults: 50,
      pageToken: pageToken || ''
    };

    return fetch(YOUTUBE_COMMENT_API_URL + '?' + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        this.originalData.push(data);
        console.log(data);

        const nextPageToken = data.nextPageToken;
        if (nextPageToken) {
          return this.fetchComment(videoId, nextPageToken);
        }
      })
      .catch((error) => {
        console.error('댓글을 불러오는 중 오류가 발생했습니다:', error);
        this.isFetchCompleted = false;
        throw error;
      });
  }
};