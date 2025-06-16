import {request, useRequest} from "@/utils";
import {YesNoEnum} from "@/enums";

export namespace useVideoDetail {

  export interface Response {
    /**
     * 演员信息
     */
    actorBaseVOS: ActorBaseVO[];
    /**
     * 是否收藏
     */
    collectFlag: boolean;
    /**
     * 收藏数
     */
    collectCnt: number;
    /**
     * 封面url
     */
    cover: string;
    /**
     * 视频id
     */
    id: number;
    /**
     * 简介
     */
    introduction: string;
    /**
     * 是否喜欢
     */
    likeFlag: boolean;
    /**
     * 喜爱数
     */
    likeCnt: number;
    /**
     * 视频名
     */
    name: string;
    /**
     * 总集数
     */
    totalEpisodes: number;
    /**
     * 标签
     */
    videoLabelVOS: VideoLabelVO[];
    /**
     * 最后播放时长
     */
    lastWatchPos: number;

    /**
     * 最后播放集数
     */
    lastWatchEpisodeId: number;

    /**
     * 是否已播放完成
     */
    lastWatchIsFinished: boolean;
    /**
     * 是否下线
     */
    state: YesNoEnum;
    [property: string]: any;
  }

  export interface ActorBaseVO {
    /**
     * 性别
     */
    avatar: string;
    /**
     * 演员id
     */
    id: string;
    /**
     * 演员姓名
     */
    name: string;
    [property: string]: any;
  }

  export interface VideoLabelVO {
    id?: number;
    name?: string;
    [property: string]: any;
  }
}

export namespace useVideoInfo {
  export interface Request {
    /**
     * 视频id
     */
    translateId:  number | string;
    [property: string]: any;
  }

  export interface Response {
    /**
     * 收藏数
     */
    collectCnt: number;
    epiDetails: EpiDetail[];
    /**
     * 视频id
     */
    id: string;
    /**
     * 点赞数
     */
    likeCnt: number;
    /**
     * 视频名
     */
    name: string;
    [property: string]: any;
  }

  export interface EpiDetail {
    /**
     * 观看需金币
     */
    coin?: number;
    /**
     * 下载需金币
     */
    dlCoin?: number;
    /**
     * 下载是否解锁
     */
    dlUnlock?: boolean;
    /**
     * 集数
     */
    episodeId?: number;
    /**
     * 分辨率对应信息
     */
    resolutions?: Resolution[];
    /**
     * 集标题
     */
    title?: string;
    /**
     * 观看是否解锁
     */
    watchUnlock?: boolean;
    [property: string]: any;
  }

  export interface Resolution {
    /**
     * 观看需coin
     */
    coin?: number;
    /**
     * 下载需coin
     */
    dlCoin?: number;
    /**
     * 语言
     */
    languageCode?: string;
    /**
     * 分辨率
     */
    resolution?: string;
    /**
     * 特殊标识
     */
    specialFlag?: boolean;
    /**
     * 视频明细表id
     */
    videoDetailId?: number;
    /**
     * 地址
     */
    videoUrl?: string;
    /**
     * vip等级要求
     */
    vipLevel?: number;
    [property: string]: any;
  }
}

export namespace useQualityInfo {
  export interface QualityItem {
    name: string;
    code: string;
    vipLevel: string | number | null;
  }
}

export namespace useCollectOrLike {
  export interface Request {
    /**
     * 1-收藏  2-点赞  3-取消收藏: 4-取消点赞
     */
    type: CollectOrLikeEnum;
    /**
     * 短视频id
     */
    translateId:  number | string;
    [property: string]: any;
  }

  export interface Response {
    /**
     * 更新后收藏数
     */
    collectCnt: number;
    /**
     * 更新后喜爱数
     */
    likeCnt: number;
    [property: string]: any;
  }
}

export namespace useWatchRecord {
  export interface Request {
    /**
     * 当前观看位置(第几秒)
     */
    currentPos: number;
    /**
     * 集id
     */
    episodeId: number;
    /**
     * 是否看完
     */
    isFinished: boolean;
    /**
     * 播放入口（0:详情页 1:推荐流 2:历史记录 3:分享链接 4:搜索页）
     */
    sourceType: string;
    /**
     * 该集总共多少秒
     */
    totalDuration: number;
    /**
     * 视频id
     */
    translateId: number;
    [property: string]: any;
  }

  export interface Response {

  }
}

export namespace useUnlockVideo {
  export interface Request {
    /**
     * 花费coin
     */
    costCoins: number;
    /**
     * 有效期时间(单位天), 不传表示没有时间限制
     */
    period?: number;
    /**
     * 分辨率
     */
    resolution: string;
    /**
     * 0-解锁观看 1-解锁下载
     */
    type: number;
    /**
     * 解锁范围具体（针对部分解锁情况）
     */
    unlockScope?: UnlockScope[];
    /**
     * 解锁范围（0-全部 1-部分）
     */
    unlockScopeFlag: number;
    /**
     * 解锁方式（0=金币解锁， 1=任务解锁）
     */
    unlockType: number;
    /**
     * 剧id
     */
    translateId: number | string;
    [property: string]: any;
  }

  export interface UnlockScope {
    /**
     * 结束集编号
     */
    end?: number;
    /**
     * 开始集编号
     */
    start?: number;
    [property: string]: any;
  }

  export interface Response {

  }
}

// 是否自动播放下一集
export enum AuToPlayStatusEnum {
  // 自动播放
  AUTOPLAY = '1',
  // 不自动播放
  UNAUTOPLAY = '0',
}

// 收藏点赞
export enum CollectOrLikeEnum {
  // 1-收藏
  COLLECT = 1,
  // 2-点赞
  LIKE = 2,
  // 3-取消收藏
  UNCOLLECT = 3,
  // 4-取消点赞
  UNLIKE = 4,
}

// 描述播放器的当前状态。
export enum VideoPlayerStatusEnum {
  // 播放器未播放或加载任何视频。
  IDLE = 'idle',
  // 播放器正在从提供的源加载视频数据
  LOADING = 'loading',
  // 播放器已加载足够的数据，可以开始播放或继续播放。
  READYTOPLAY = 'readyToPlay',
  // 播放器在加载或播放视频时遇到错误。
  ERROR = 'error',
}

// 播放入口
export enum SourceTypeEnum {
  // 0:详情页
  DETAIL = '0',
  // 1:推荐流
  RECOMMEND = '1',
  // 2:历史记录
  HISTORY = '2',
  //3:分享链接
  SHARE = '3',
  // 4:搜索页
  SEARCH = '4',
}

/**
 * 获取短剧明细
 * @param translateId 短剧Id
 */
export function useVideoDetail(translateId: string | number) {
  const {data, ...rest} = useRequest<useVideoDetail.Response>({
    url:  `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/video/detail?translateId=${translateId}`
  });
  // data && console.log('获取短剧明细:', data);
  return {
    data: data, ...rest
  };
}

/**
 * 获取短视频所有信息
 * @param params
 */
export function useVideoInfo(params: useVideoInfo.Request) {
  const {data, ...rest} = useRequest<useVideoInfo.Response>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/video/info?translateId=${params?.translateId}`
  });
  return {
    data: data, ...rest
  };
}

export function fetchVideoInfo(translateId: string | number) {
  return request<useVideoInfo.Response>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/video/info?translateId=${translateId}`
  });
}

/**
 * 收藏/点赞接口
 * @param params
 */
export function collectOrLike(params: useCollectOrLike.Request) {
  return request({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/collectOrlike?translateId=${params.translateId}&type=${params.type}`
  })
}

/**
 * 短视频观看记录(按集)
 * @param params
 */
export function watchRecord(params: useWatchRecord.Request) {
  return request({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/watch/record`,
    data: params
  })
}

/**
 * 金币解锁(下载/观看)
 * @param params
 */
export function unlockVideo(params: useUnlockVideo.Request) {
  return request({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/unlock`,
    data: params
  })
}

