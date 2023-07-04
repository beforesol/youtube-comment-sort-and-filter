import { API_KEY, YOUTUBE_COMMENT_API_URL } from '../contants/API.js';
import { FILTER, LANGUAGE, SORT } from '../contants/filter.js';
import { EN_REGEX, JA_REGEX, KO_REGEX, TH_REGEX, ZH_CHS_REGEX } from '../contants/regex.js';

const LANGUAGE_PERCENTAGE = 90;

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
        this.originalData.push(...data.items.map(item => item.snippet));
        console.log(data)
        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //   const tab = tabs[0];
        //   chrome.tabs.sendMessage(tab.id, { action: 'log', data });
        // });

        const nextPageToken = data.nextPageToken;
        if (nextPageToken) {
          return this.fetchComment(videoId, nextPageToken);
        } else {
          this.data = this.originalData
        }
      })
      .catch((error) => {
        throw error;
      });
  },
  clear() {
    this.data = this.originalData;
    console.log(this.data)
  },
  languageFilterCallback(comment, regex) {
    const text = comment.topLevelComment.snippet.textOriginal.trim();
    const characters = text.replace(regex, '');
    const percentage = (characters.length / text.length) * 100;

    return percentage >= LANGUAGE_PERCENTAGE;
  },
  filter({ filter, sort, lang }) {
    if (filter.includes(FILTER.TIMELINE)) {
      this.data = this.originalData.filter(comment => {
        const text = comment.topLevelComment.snippet.textOriginal.trim();
        const pattern = /\d{2}:\d{2}:\d{2}/;

        return pattern.test(text);
      })
    } else {
      this.data = this.originalData
    }

    switch (sort) {
      case SORT.DEFAULT:
        break;
      case SORT.RECOMMEND_COUNT:
        this.data = this.data.sort((a, b) => b.topLevelComment.snippet.likeCount - a.topLevelComment.snippet.likeCount)
        break;
      case SORT.REPLY_COUNT:
        this.data = this.data.sort((a, b) => b.totalReplyCount - a.totalReplyCount)
        break;
      default:
        break;
    }

    switch (lang) {
      case LANGUAGE.DEFAULT:
        break;
      case LANGUAGE.KO:
        this.data = this.data.filter(comment => this.languageFilterCallback(comment, KO_REGEX))
        break;
      case LANGUAGE.EN:
        this.data = this.data.filter(comment => this.languageFilterCallback(comment, EN_REGEX))
        break;
      case LANGUAGE.ZH_CHS:
        this.data = this.data.filter(comment => this.languageFilterCallback(comment, ZH_CHS_REGEX))
        break;
      case LANGUAGE.JA:
        this.data = this.data.filter(comment => this.languageFilterCallback(comment, JA_REGEX))
        break;
      case LANGUAGE.TH:
        this.data = this.data.filter(comment => this.languageFilterCallback(comment, TH_REGEX))
        break;
      default:
        break;
    }

    console.log(this.data)
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   const tab = tabs[0];
    //   chrome.tabs.sendMessage(tab.id, { action: 'log', data: this.data });
    // });
  },
};