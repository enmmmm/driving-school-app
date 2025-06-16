import {useRequest} from "@/utils";
import {Platform} from "react-native";

export namespace useVideoList {
  export interface VideoItem {
    id: number;
    translateId: number;
    name: string;
    videoLabelVOList: labelItem[];
    heatCnt: string;
    introduction: string;
    recommendUrl: string;
  }
  export interface labelItem {
    id: number;
    name: string;
  }
}

export namespace useVideoContainer {
  export type ViewSize = {
    width: number;
    height: number;
  };
}

/**
 * 获取推荐列表
 */
export function useRecommendList() {
  const  {data, ...rest} = useRequest<useVideoList.VideoItem[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/recommend/next`
  });
  // data && console.log('获取推荐列表:', data);
  return {
    data: data?.filter((item)=> !!item.recommendUrl), ...rest
  };
}
