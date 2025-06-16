import {useRequest} from "@/utils";

export namespace usePerformerDetail {
  export interface Data {
    /**
     * 简介
     */
    introduction: string;
    /**
     * 演员名字
     */
    name: string;
    /**
     * 性别
     */
    sexDc: string;
    sexDn: string;
    avatar: string;
    actorVideoVOList: Video[];
  }

  export interface Video {
    /**
     * 封页地址
     */
    cover?: string;
    /**
     * 视频id
     */
    id?: number;
    /**
     * 视频名
     */
    name?: string;
  }
}

/**
 * 获取演员详情
 * @param id
 */
export function usePerformerDetail(id: string) {
  const {data, ...rest} = useRequest<usePerformerDetail.Data>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/video/homepage/actor/detail?actorId=${id}`
  })

  console.log('usePerformerDetail:', data);
  //
  // const mockData: usePerformerDetail.Data = {
  //   videos: [
  //     {id: 1, name: 'Ripley', cover: 'https://pic-prod-cdn.swifthealth.cn/other/1e8c69bec9a145a094b08083ea721729'},
  //     {id: 2, name: 'Loki', cover: 'https://pic-prod-cdn.swifthealth.cn/other/6c04fd16987f474f8115309194836a10'},
  //     {
  //       id: 3,
  //       name: 'Deep in the heart',
  //       cover: 'https://pic-prod-cdn.swifthealth.cn/other/0488825883ce440b89e58f0aff8b5fd3'
  //     },
  //     {
  //       id: 4,
  //       name: 'The Last of Us',
  //       cover: 'https://pic-prod-cdn.swifthealth.cn/other/c844a1f57a7944c48dfa055c2c7feeb1'
  //     },
  //     {
  //       id: 5,
  //       name: 'Young Woman and the',
  //       cover: 'https://pic-prod-cdn.swifthealth.cn/other/c063e9013d994038b4d4d2e45aed98d6'
  //     },
  //     {
  //       id: 6,
  //       name: 'KastanJemanden',
  //       cover: 'https://pic-prod-cdn.swifthealth.cn/other/f9cd3ec0e3c841c6b034eb2d297a3a26'
  //     },
  //   ],
  //   introduction: "Bryan Lee Cranston (born September 29, 1952) is an American actor, producer, and screenwriter. He is best known for his portrayals of Jesse Pinkman and Walter White in the AMC series Breaking Bad and Better Call Saul, respectively.",
  //   name: "Bryan Cranston",
  //   sexDc: "1",
  //   sexDn: "Male"
  // }

  return {
    // data: mockData, ...rest
    data: data, ...rest
  }
}
