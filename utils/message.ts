import { getAvatarSourceByPath } from '@/apis/customer-service';
import { V2NIMMessage } from 'nim-web-sdk-ng/dist/v2/NIM_RN_SDK/V2NIMMessageService';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/ar';
import 'moment/locale/es';

export function isSameDay(currentMessage: V2NIMMessage, diffMessage: V2NIMMessage | null) {
  if (!diffMessage || !diffMessage.createTime) return false;
  const currentCreatedTime = moment(currentMessage.createTime);
  const diffCreatedTime = moment(diffMessage.createTime);
  if (!currentCreatedTime.isValid() || !diffCreatedTime.isValid()) return false;
  if (!currentCreatedTime.isSame(diffCreatedTime, 'day')) return false;
  return inFiveMinutes(currentCreatedTime, diffCreatedTime);
}
/**
 * 聊天消息时间显示说明
 * 1、当天的消息，以每5分钟为一个跨度的显示时间；
 * 2、消息超过1天、小于1周，显示星期+收发消息的时间；
 * 3、消息大于1周，显示手机收发时间的日期。
 */
function inFiveMinutes(currentCreateTime: any, diffCreateTime: any) {
  const minutes5 = 5 * 60 * 1000;
  return currentCreateTime - diffCreateTime < minutes5;
}

// 定义语言资源类型
type LanguageResources = {
  yesterday: string;
  dayBeforeYesterday: string;
  today: string;
  monthDayFormat: string;
  fullDateFormat: string;
  timeFormat: string;
};

// 完整的语言资源映射
const LANGUAGE_RESOURCES: Record<string, LanguageResources> = {
  zh: {
    yesterday: '昨天',
    dayBeforeYesterday: '前天',
    today: '今天',
    monthDayFormat: 'M月D日',
    fullDateFormat: 'YYYY年M月D日',
    timeFormat: 'HH:mm'
  },
  en: {
    yesterday: 'Yesterday',
    dayBeforeYesterday: 'Day before yesterday',
    today: 'Today',
    monthDayFormat: 'MMM D',
    fullDateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm'
  },
  ar: {
    yesterday: 'أمس',
    dayBeforeYesterday: 'قبل أمس',
    today: 'اليوم',
    monthDayFormat: 'D MMM',
    fullDateFormat: 'D MMMM YYYY',
    timeFormat: 'HH:mm'
  },
  es: {
    yesterday: 'Ayer',
    dayBeforeYesterday: 'Anteayer',
    today: 'Hoy',
    monthDayFormat: 'D [de] MMM',
    fullDateFormat: 'D [de] MMMM [de] YYYY',
    timeFormat: 'HH:mm'
  }
};

export function formatMessageDate(currentMessage: any = {}, language = 'en') {
  // 获取语言资源
  const resources = LANGUAGE_RESOURCES[language];

  // 使用本地时间进行比较
  const messageTime = moment(currentMessage.createTime).local();
  const now = moment().local();

  // 使用日历日进行比较，而不是24小时差值
  const isToday = now.isSame(messageTime, 'day');
  const isYesterday = now.clone().subtract(1, 'day').isSame(messageTime, 'day');
  const isDayBeforeYesterday = now.clone().subtract(2, 'days').isSame(messageTime, 'day');
  const isSameYear = now.isSame(messageTime, 'year');

  // 时间部分
  const timePart = messageTime.format(resources.timeFormat);

  // 日期部分
  let datePart = '';

  if (isToday) {
    return `${resources.today} ${timePart}`;
  } else if (isYesterday) {
    datePart = resources.yesterday;
  } else if (isDayBeforeYesterday) {
    datePart = resources.dayBeforeYesterday;
  } else if (now.diff(messageTime, 'days') < 7) {
    datePart = messageTime.format('dddd'); // 星期几
  } else if (isSameYear) {
    datePart = messageTime.format(resources.monthDayFormat);
  } else {
    datePart = messageTime.format(resources.fullDateFormat);
  }

  // 阿拉伯语特殊处理（RTL）
  if (language === 'ar') {
    return `${timePart} ${datePart}`;
  }

  return `${datePart} ${timePart}`;
}


export function containsAll(arr1: string[], arr2: string[]) {
  for (const element of arr2) {
    if (!arr1.includes(element)) {
      return false;
    }
  }
  return true;
}

export function isCustomMessage(message: V2NIMMessage): boolean {
  const serverExtension = message.serverExtension ? parseJsonString(message.serverExtension) : {};
  const customKeys = [
    'questionList',
    // 'questionDividesList',
    'cuserHelpMessage',
    'cuserHrefMessage',
    'waitLineMessage',
    'jumpAbleText',
    'questionList',
    'questionDividesList'
    // 'evalMessage'
  ];
  return customKeys.some(key => serverExtension[key]);
}

export function parseJsonString(jstring: string): any {
  let jsonObj = {};
  try {
    jsonObj = JSON.parse(jstring);
  } catch (error) {
    jsonObj = {};
  }
  return jsonObj;
}