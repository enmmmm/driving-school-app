import { request, useRequest } from '@/utils';

// 常见问题
export function useCommonQuestions() {
  return useRequest<any[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/customer/servicerecord/guess/ask`
  });
}

// 发起会话
export function startService(params: {
  sendFlag: 1 | 0; //是否结束 1是 0否
}): any {
  console.log('startService', params);
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/customer/servicerecord/start/service`,
    data: params
  });
}

// 机器人回复
export function robotReply(params: { tid: string; msg: string; id: string }) {
  console.log('robotReply', params);
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/customer/servicerecord/robot/reply`,
    data: params
  });
}

// 加入人工会话（坐席分配）
export function joinService(params: {
  waitFlag: 1 | 2; //1.第一次分配2.进入等待队列
}): any {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/customer/servicerecord/seat/distribution`,
    data: params,
    method: 'POST'
  });
}

export function getAvatarSourceByPath(path: string) {
  return `${process.env.EXPO_PUBLIC_API_URL}/fs/swhos/viewByPath?path=${path}`;
}
