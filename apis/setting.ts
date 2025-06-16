import { LoginTypeEnum } from '@/enums';
import { EnableDisableEnum } from '@/enums/enable-disable-enum';
import { request, useRequest } from '@/utils';
import { VerifyTypeEnum } from './auth/sign-up';

export interface BindInfo {
  id: string;
  userId: string;
  trafficType: number;
  // 邮箱
  trafficEmail: string;
  // 是否绑定
  bindState: EnableDisableEnum;
  // 是否设置密码
  pwdState: EnableDisableEnum;
}

export function submitLanguage(currentTranslate: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/config/basic?currentTranslate=${currentTranslate}`,
    method: 'POST'
  });
}

export function submitAutoNext(autoNext: EnableDisableEnum) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/config/basic?autoNext=${autoNext}`,
    method: 'POST'
  });
}

export function fetchBindInfo() {
  return request<BindInfo[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/bind/info`
  });
}

// 判断邮箱是否可以绑定
export function checkAccount(emailAccount: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { emailAccount, sendCodeFlag: false, verifyType: VerifyTypeEnum.bind }
  });
}

// 获取验证码
export function getVerifyCode(emailAccount: string, verifyType: VerifyTypeEnum) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { emailAccount, sendCodeFlag: true, verifyType }
  });
}

// 换绑新邮箱时获取验证码
export function getNewVerifyCode(params: { emailAccount: string; verifyType: VerifyTypeEnum; oldEmailAccount: string; code: string }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { ...params, sendCodeFlag: true }
  });
}

export function checkVerifyCode(params: { code: string; emailAccount: string; verifyType: VerifyTypeEnum }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/check/code`,
    method: 'POST',
    data: { ...params }
  });
}

export function bindEmail(params: { code: string; emailAccount: string }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/bind`,
    method: 'POST',
    data: { ...params, typeCode: LoginTypeEnum.email }
  });
}

export function changeBindEmail(params: { newEmail: string; code: string; emailAccount: string }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/change/bind`,
    method: 'POST',
    data: { ...params }
  });
}

// 绑定第三方账号
export function bindThirdAccount(params: {
  typeCode: LoginTypeEnum;
  idToken: string;
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
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/bind`,
    method: 'POST',
    data: { ...params }
  });
}

export function unbindAccount(params: { typeCode: LoginTypeEnum; emailAccount: string }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/unbind`,
    method: 'POST',
    data: { ...params }
  });
}

// 设置密码
export function setPassword(params: {
  pwd: string; //用户密码
  emailAccount: string;
}) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/update/pwd`,
    method: 'POST',
    data: params
  });
}

export function useAboutUs() {
  return useRequest<any[]>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/center/about/us`
  });
}
