import {request, useRequest} from "@/utils";
import {PageInfo} from "@/utils/request/api-response";
import {EnableDisableEnum} from "@/enums";

export namespace useMarkList {
  export interface Model {
    /**
     * 视频封面
     */
    cover: string;
    /**
     * 最近观看剧集分集编号
     */
    episodeNum: number;
    /**
     * 剧集介绍
     */
    introduction: string;
    /**
     * 标签
     */
    label: string[];
    /**
     * 剧集状态，上下架
     */
    state: EnableDisableEnum;
    /**
     * 总集数
     */
    totalEpisodes: number;
    /**
     * 短剧唯一标识
     */
    videoId: string;
    /**
     * 视频名称
     */
    videoName: string;
  }
}

/**
 * 获取收藏列表
 */
export function useMarkList() {
  const {data, ...rest} = useRequest<PageInfo<useMarkList.Model>>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/history/collectRecord?page=0&size=999`
  })

  console.log('useMarkList', data);

  return {
    data: data?.models, ...rest
    // data: mockData, ...rest
  };
}

/**
 * 删除收藏
 */
export function removeMarkList(videoIds: number[]) {
  return request({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/history/unCollect?videoIds=${videoIds.join(',')}`
  })
}
