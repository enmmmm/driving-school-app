import { EnableDisableEnum, LoginTypeEnum } from '@/enums';
import { request } from '@/utils';

export function emailLogin(params: {
  pwd: string; //用户密码
  emailAccount: string;
  loginDevice: string;
}) {
  return request<string>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/login`,
    method: 'POST',
    data: params
  });
}

export function touristLogin(loginDevice: string) {
  return request<string>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/tourist/login`,
    method: 'POST',
    data: { loginDevice }
  });
}

export function thirdLogin(params: {
  loginType: LoginTypeEnum;
  authCode: string;
  loginDevice: string;
  /**
   * 仅支持 tiktok 登录时使用
   */
  codeVerifier?: string;
  /**
   * 登录终端：ios、android
   * facebook对ios、android登录逻辑需要区分处理
   */
  platform?: string;
  /**
   * 登录请求唯一标识
   * facebook用到，校验是否伪造标识
   */
  nonce?: string;
}) {
  return request<{
    token: string;
    registerFlag: EnableDisableEnum;
  }>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/third/login`,
    method: 'POST',
    data: params
  });
}

export function logout() {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/logout`,
    method: 'POST'
  });
}

export function logoff() {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/delete`,
    method: 'POST'
  });
}
