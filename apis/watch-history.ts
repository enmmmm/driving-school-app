import {request, useRequest} from "@/utils";
import {PageInfo} from "@/utils/request/api-response";
import {EnableDisableEnum} from "@/enums";

export namespace useWatchHistoryList {
  export interface Model {
    /**
     * 视频封面
     */
    cover: string;
    /**
     * 分集编号
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
     * 剧集状态，上架下架
     */
    state: EnableDisableEnum;
    /**
     * 总集数
     */
    totalEpisodes: number;
    /**
     * 总共观看的集数
     */
    totalWatch: number;
    /**
     * 短剧id
     */
    videoId: number;
    /**
     * 视频名称
     */
    videoName: string;
  }
}

/**
 * 获取观看历史
 */
export function useWatchHistoryList() {
  const {data, ...rest} = useRequest<PageInfo<useWatchHistoryList.Model>>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/history/watchRecord?page=0&size=999`
  })

  console.log('useWatchHistoryList', data);

  // const mockData: useWatchHistoryList.Model[] = [
  //   {
  //     videoId: 1,
  //     videoName: 'Ripley',
  //     cover: 'https://pic-prod-cdn.swifthealth.cn/other/1e8c69bec9a145a094b08083ea721729',
  //     episodeNum: 1,
  //     introduction: "xxxxxxxxxxxx",
  //     label: ["Drama", "Action"],
  //     state: `${EnableDisableEnum.Enable}`,
  //     totalEpisodes: 88,
  //     totalWatch: 60
  //   },
  //   {
  //     videoId: 2,
  //     videoName: 'Loki',
  //     cover: 'https://pic-prod-cdn.swifthealth.cn/other/6c04fd16987f474f8115309194836a10',
  //     episodeNum: 1,
  //     introduction: "xxxxxxxxxxxx",
  //     label: ["Drama", "Action"],
  //     state: `${EnableDisableEnum.Enable}`,
  //     totalEpisodes: 88,
  //     totalWatch: 30
  //   },
  //   {
  //     videoId: 3,
  //     videoName: 'Deep in the heart Deep in the heart Deep in the heart',
  //     cover: 'https://pic-prod-cdn.swifthealth.cn/other/0488825883ce440b89e58f0aff8b5fd3',
  //     episodeNum: 20,
  //     introduction: "xxxxxxxxxxxx",
  //     label: ["Drama", "Action"],
  //     state: `${EnableDisableEnum.Disable}`,
  //     totalEpisodes: 88,
  //     totalWatch: 88
  //   },
  // ];

  return {
    data: data?.models, ...rest
    // data: mockData, ...rest
  };
}

/**
 * 删除观看历史
 * @param videoIds
 */
export function removeWatchHistory(videoIds: number[]) {
  return request({
    method: "POST",
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/history/removeWatch?videoIds=${videoIds.join(',')}`
  })
}
