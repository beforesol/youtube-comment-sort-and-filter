/**
 * thenDate가 nowDate보다 얼마나 이전인지 계산하여, 규격화된 문자열 형태로 반환한다. 규칙은 아래와 같다.
 *
 * 1분 미만 : 방금전
 * 1분 ~ 1시간 미만 : N분전
 * 1시간 ~ 24시간 미만 : N시간 전
 * 1일 ~ 7일 미만 : N일 전
 * 1주 ~ 4주 미만 : N주 전
 * 1달 ~ 12달 미만 : N달 전
 * 1년 ~ 99년 : N년 전
 * 100년 이상 : 99+년 전
*/

const MIN_SECONDS = 60;
const HOUR_SECONDS = MIN_SECONDS * 60;
const DAY_SECONDS = HOUR_SECONDS * 24;
const WEEK_SECONDS = DAY_SECONDS * 7;
const MONTH_SECONDS = DAY_SECONDS * 30;
const YEAR_SECONDS = DAY_SECONDS * 365;

const YEAR_LIMIT = 99;
const MONTH_LIMIT = 12;
const WEEK_LIMIT = 4;
const DEFAULT_UNIT = '1';

const CENTURY_BEFORE = '99+years ago';
const YEAR_BEFORE = 'years ago';
const MONTH_BEFORE = 'months ago';
const WEEK_BEFORE = 'weeks ago';
const DAY_BEFORE = 'days ago';
const HOUR_BEFORE = 'housr ago';
const MIN_BEFORE = 'minutes ago';
const JUST_BEFORE = 'just now';

export const getPeriodTimeStringForClip = (produceDate) => {
  const nowDate = new Date();
  const thenDate = new Date(produceDate);

  const timeGap = (nowDate.getTime() - thenDate.getTime());

  if (inYearsOf(timeGap) > 0) {
    if (inYearsOf(timeGap) > YEAR_LIMIT) {
      return CENTURY_BEFORE;
    } else {
      return inYearsOf(timeGap) + ' ' + YEAR_BEFORE;
    }
  }

  if (inMonthsOf(timeGap) > 0) {
    if (inMonthsOf(timeGap) == MONTH_LIMIT && isMonthDayBeforeThanNow(thenDate, nowDate)) {
      return DEFAULT_UNIT + ' ' + YEAR_BEFORE;
    } else {
      return inMonthsOf(timeGap) + ' ' + MONTH_BEFORE;
    }
  }
  if (inWeeksOf(timeGap) > 0) {
    if (inWeeksOf(timeGap) == WEEK_LIMIT && isDayBeforeThanNow(thenDate, nowDate)) {
      return DEFAULT_UNIT + ' ' + MONTH_BEFORE;
    } else {
      return inWeeksOf(timeGap) + ' ' + WEEK_BEFORE;
    }
  }
  if (inDaysOf(timeGap) > 0) {
    return inDaysOf(timeGap) + ' ' + DAY_BEFORE;
  }
  if (inHoursOf(timeGap) > 0) {
    return inHoursOf(timeGap) + ' ' + HOUR_BEFORE;
  }
  if (inMinutesOf(timeGap) > 0) {
    return inMinutesOf(timeGap) + ' ' + MIN_BEFORE;
  }

  return JUST_BEFORE;
};

/**
 * @return thenDate의 월/일이 nowDate의 월/일과 같거나 이전인 경우 true, 아니면 false
 */
const isMonthDayBeforeThanNow = (thenDate, nowDate) => {
  const then = new Date(thenDate);
  const now = new Date(nowDate);

  if (then.getMonth() < now.getMonth()) {
    return true;
  } else if (then.getMonth() == now.getMonth()) {
    return (then.getDay() <= now.getDay());
  } else {
    return false;
  }
};

/**
 * @return thenDate의 일자가 nowDate의 일자와 같거나 이전인 경우 true, 아니면 false
 */
const isDayBeforeThanNow = (thenDate, nowDate) => {
  const then = new Date(thenDate);
  const now = new Date(nowDate);

  return (then.getDay() <= now.getDay());
};

const inSecondsOf = (timeGap) => {
  return (timeGap / 1000);
};

const inMinutesOf = (timeGap) => {
  return Math.floor(inSecondsOf(timeGap) / MIN_SECONDS);
};

const inHoursOf = (timeGap) => {
  return Math.floor(inSecondsOf(timeGap) / HOUR_SECONDS);
};

const inDaysOf = (timeGap) => {
  return Math.floor(inSecondsOf(timeGap) / DAY_SECONDS);
};

const inWeeksOf = (timeGap) => {
  return Math.floor(inSecondsOf(timeGap) / WEEK_SECONDS);
};

const inMonthsOf = (timeGap) => {
  return Math.floor(inSecondsOf(timeGap) / MONTH_SECONDS);
};

const inYearsOf = (timeGap) => {
  return Math.floor(inSecondsOf(timeGap) / YEAR_SECONDS);
};
