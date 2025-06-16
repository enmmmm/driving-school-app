import {request, useRequest} from "@/utils";

export namespace useSearchHistory {
  export interface Datum {
    /**
     * 记录id
     */
    id: number;
    /**
     * 搜索时间
     */
    searchTime: string;
    /**
     * 搜索词
     */
    searchWd: string;
    /**
     * 入口源 0-首页
     */
    source: number;

    [property: string]: any;
  }
}

/**
 * 获取搜索历史
 */
export function useSearchHistory() {
  return useRequest<useSearchHistory.Datum[]>({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/search/history`
  })
}

/**
 * 清除搜索历史
 */
export function clearSearchHistory() {
  return request({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/search/history/clear`
  })
}

export namespace useSearchTrending {
  export interface Datum {
    /**
     * 封面
     */
    cover: string;
    /**
     * 热值
     */
    heatCnt: number;
    /**
     * 视频id
     */
    id: number;
    /**
     * 视频名
     */
    name: string;
    /**
     * 标签
     */
    videoLabelVOS: VideoLabelVO[];
    /**
     * 置顶
     */
    manageSetFlag: boolean;
  }

  export interface VideoLabelVO {
    /**
     * 标签id
     */
    id: number;
    /**
     * 标签中文名
     */
    name: string;
  }
}

/**
 * 获取搜索热门
 */
export function useSearchTrending() {
  return useRequest<useSearchTrending.Datum[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/homepage/hot/query`
  })
}

export namespace useSearch {
  export interface Data {
    actorObjList: Actor[];
    videoObjList: Video[];

    [property: string]: any;
  }

  export interface Actor {
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 演员id
     */
    id: string;
    /**
     * 名字
     */
    name: string;
    /**
     * 性别
     */
    sexDc: string;
    sexDn: string;
    /**
     * 简介
     */
    introduction: string;
  }

  export interface Video {
    /**
     * 封页地址
     */
    cover?: string;
    /**
     * 简介
     */
    introduction?: string;
    /**
     * 标签
     */
    labels?: Label[];
    /**
     * 推荐视频地址
     */
    recommend?: string;
    /**
     * 总集数
     */
    totalEpisodes?: number;
    /**
     * 视频id
     */
    id?: string;
    /**
     * 视频id
     */
    videoId?: string;
    translateId?: string;
    /**
     * 视频名
     */
    name?: string;
  }

  export interface Label {
    /**
     * 标签id
     */
    labelId?: string;
    /**
     * 标签默认名
     */
    defaultName?: string;
    /**
     * 标签名
     */
    labelName?: string;
    /**
     * 语言
     */
    lang: string;
  }
}

/**
 * 搜索
 */
export function useSearch(searchWd: string) {
  return useRequest<useSearch.Data>(!!searchWd ? {
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/search/query?type=0&searchWd=${searchWd}`,
  } : null)
}

/**
 * 获取搜索建议
 */
export function useSearchSuggest(inputWd = '') {
  return useRequest<string[]>({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/search/suggest?inputWd=${inputWd}`,
  });
}
