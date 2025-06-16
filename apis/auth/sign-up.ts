import { LoginTypeEnum } from '@/enums';
import { request } from '@/utils';

export enum VerifyTypeEnum {
  signUp = '1', //注册
  resetPassword = '2', //忘记密码
  bind = '3', //绑定
  changeOld = '4', //换绑旧邮箱验证
  changeNew = '5' //换绑新邮箱验证
}

export function checkAccount(emailAccount: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { emailAccount, sendCodeFlag: false, verifyType: VerifyTypeEnum.signUp }
  });
}

export function getVerifyCode(emailAccount: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { emailAccount, sendCodeFlag: true, verifyType: VerifyTypeEnum.signUp }
  });
}

export function checkVerifyCode(params: { code: string; emailAccount: string }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/check/code`,
    method: 'POST',
    data: { ...params, verifyType: VerifyTypeEnum.signUp }
  });
}

export function register(params: {
  loginUuid: string; //邮箱账号
  loginType: LoginTypeEnum; //用户登录方式
  password: string; //用户密码
  loginDevice: string; //登录设备mac
}) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/register`,
    method: 'POST',
    data: params
  });
}
