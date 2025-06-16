import {useRequest} from "@/utils";
import {EnableDisableEnum, YesNoEnum} from "@/enums";
import {PageInfo} from "@/utils/request/api-response";

// @ts-ignore
export namespace useHomeCarousel {
  export enum JumpType {
    VIDEO = 1, // (1, "短剧"),
    ACTIVITY = 2, // (2, "活动"),
    H5_URL = 3, // (3, "第三方链接"),
  }

  export interface Datum {
    id: string;
    translateCode: string;
    imgName: string;
    jumpFlag: YesNoEnum,
    jumpType: JumpType;
    jumpContent: string
    imgUrl: string;
    sort: number;
    state: EnableDisableEnum;
    addInfo?: {
      name?: string;
      labelNames?: string;
    }
  }
}

/**
 * 获取首页轮播
 */
export function useHomeCarousel() {
  return useRequest<useHomeCarousel.Datum[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/homepage/show/config`
  })
}

export namespace useHomeCategory {
  export interface Datum {
    id: string;
    labelDefaultName: string;
    state: EnableDisableEnum;
    translateCode: string;
    labelName: string;
  }
}

/**
 * 获取首页分类
 */
export function useHomeCategory() {
  return useRequest<useHomeCategory.Datum[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/homepage/labels`
  })
}

export namespace useHomeVideoList {
  export interface Datum {
    /**
     * 封面
     */
    cover: string;
    /**
     * 视频id
     */
    id: string;
    /**
     * 视频名
     */
    name: string;
    translateCode: string;
    heatCnt: number;
    state: EnableDisableEnum;
  }
}

/**
 * 获取首页视频列表
 */
export function useHomeVideoList(labelId: string | null) {
  const {data, ...rest} =  useRequest<PageInfo<useHomeVideoList.Datum>>({
    method: 'POST',
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/homepage/label?page=0&size=999${labelId ? `&labelId=${labelId}` : ''}`,
  })

  return {
    data: data?.models,
    ...rest
  }
}

// @ts-ignore
export namespace useHomeNoticeList {
  export enum JumpType {
    VIDEO = 1, // (1, "短剧"),
    ACTIVITY = 2, // (2, "活动"),
    H5_URL = 3, // (3, "第三方链接"),
  }

  export interface Datum {
    id: string;
    translateCode: string;
    title: string;
    jumpFlag: YesNoEnum,
    jumpType: JumpType;
    jumpContent: string
    imgUrl: string;
    sort: number;
    state: EnableDisableEnum;
  }
}

/**
 * 获取首页公告
 */
export function useHomeNoticeList() {
  return useRequest<useHomeNoticeList.Datum[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/homepage/push/notification`,
  })
}
