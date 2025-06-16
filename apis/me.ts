import {EnableDisableEnum, LoginTypeEnum} from '@/enums';
import { request, useRequest } from '@/utils';
import useUserStore from "@/stores/useUserStore";

export interface UserInfo {
  id: string;
  /**
   * 用户注册昵称
   */
  userName: string;
  password: string;
  /**
   * 用户头像
   */
  avatarUrl: string;
  /**
   * 登录方式对应的唯一标识，账号
   */
  loginUuid: string;
  /**
   * 用户登录方式
   */
  loginType: LoginTypeEnum;
  /**
   * 用户类型(1游客 2.普通用户)
   */
  userType: string;
  /**
   * 用户注册时间
   */
  registerTime: string;
  /**
   * 登录设备mac
   */
  loginDevice: string;
  /**
   * 自动播放下一集(0:播放 1:不自动)
   */
  autoplay: EnableDisableEnum;
  currentTranslate: string;
  /**
     * 聊天token

     */
  imToken: string;
  /**
   * 聊天用户id
   */
  imUserId: string;
  /**
   * 用户有金币待领取
   */
  coinPickUp: boolean;
  /**
   * 钱包金币数量
   */
  coinCounts: string;
  /**
   * 是否是vip
   */
  vip: boolean;
}

export function fetchUserInfo() {
  return request<UserInfo>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/home/page/info`
  });
}


/**
 * 获取用户信息
 */
export function useUserInfo() {
  const { accessToken } = useUserStore.getState();
  const  {data, ...rest} = useRequest<UserInfo>({
    url: accessToken ? `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/home/page/info` : ''
  });
  return {
    data: data, ...rest
  };
}
