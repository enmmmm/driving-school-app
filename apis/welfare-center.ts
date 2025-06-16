import { request } from "@/utils";

/**
 * 子任务类型枚举
 */
export enum SubTaskTypeEnum {
  /**
   * 签到
   */
  Sign = 1,
  /**
   * 新人签到
   */
  NewPeopleSign = 2,
  /**
   * 观看广告
   */
  Ad = 3,
  /**
   * 观看剧集
   */
  Video = 4,
  /**
   * 分享
   */
  Share = 5,
  /**
   * 打开系统推送
   */
  OpenSystemPush = 6,
  /**
   * 注册登录
   */
  RegisterLogin = 8,
  /**
   * 关注Youtub
   */
  FollowYoutube,
  /**
   * 关注Facebook
   */
  FollowFacebook,
  /**
   * 关注Tiktok
   */
  FollowTiktok,
}

/**
 * 任务状态
 */
export enum TaskStateEnum {
  /**
   * 未完成
   */
  unfinished = 1,
  /**
   * 待领取
   */
  toReceive,
  /**
   * 已完成
   */
  finished,
}

export namespace TaskProgress {
  export interface Response {
    /**
     * 游客是否可以完成
     */
    allowVisitor: boolean;
    /**
     * 完成条件
     */
    condition: number;
    /**
     * 是否展示
     */
    display: boolean;
    /**
     * 是否完成
     */
    isFinished: boolean;
    /**
     * 周期类型（1:一次性 2:每日 3:每周 4:每月）
     */
    periodType: number;
    /**
     * 完成情况，比如3个广告已经完成2个
     */
    progress: number;
    /**
     * 奖励
     */
    reward: number;
    /**
     * 每日签到进度
     */
    signList: SignList[];
    /**
     * 任务状态（1:启用 2:停用 3:隐藏）
     */
    status: number;
    /**
     * 任务小分类，子类型（1:每日签到 2:新人首次七天签到 3:观看广告 4:观看剧集 5-分享 6-打开系统推送 7-关注账号 8-注册登录）
     */
    subType: number;
    /**
     * 任务id
     */
    taskId: number;
    /**
     * 任务名称
     */
    taskName: string;
    /**
     * 任务大类，任务大类（1:签到 2:每日任务 3:成就任务）
     */
    taskType: number;
    /**
     * 有效结束时间
     */
    validEnd: string;
    /**
     * 有效开始时间
     */
    validStart: string;
    /**
     * 任务状态 1-待完成，2-待领取，3-已完成
     */
    taskState: TaskStateEnum;
  }
  export interface SignList {
    /**
     * 奖励金币数
     */
    coins: number;
    /**
     * 签到的第几天
     */
    day: number;
    /**
     * 签到时间
     */
    signDate: string;
  }
}

/**
 * 查询领取的金币数
 */
export function getCoins() {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/benefit/task/queryTodayCoins`
  });
}

/**
 * 当前用户所有任务进度
 * @returns 
 */
export function getTaskProgress() {
  return request<any>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/benefit/task/currentProgress`
  });
}

/**
 * 领取金币（签到等）
 */
export function collectCoins(taskId: number) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/benefit/task/finish?taskId=${taskId}`,
    method: 'POST'
  });
}

/**
 * 批量完成任务（一键领取）
 * 1,2,3
 */
export function getAll(taskIds: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/benefit/task/batchFinish?taskIds=${taskIds}`,
    method: 'POST'
  });
}

/**
 * 去完成，单次任务：状态变为待领取，多次任务：进度+1
 */
export function doingTask(taskId: number) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/benefit/task/inProgress?taskId=${taskId}`,
    method: 'POST'
  });
}
