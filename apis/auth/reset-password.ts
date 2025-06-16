import { request } from '@/utils';
import { VerifyTypeEnum } from './sign-up';

export function checkAccount(emailAccount: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { emailAccount, verifyType: VerifyTypeEnum.resetPassword, sendCodeFlag: false }
  });
}

export function getVerifyCode(emailAccount: string) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/verify/code`,
    method: 'POST',
    data: { emailAccount, verifyType: VerifyTypeEnum.resetPassword, sendCodeFlag: true }
  });
}

export function checkVerifyCode(params: { code: string; emailAccount: string }) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/check/code`,
    method: 'POST',
    data: { ...params, verifyType: VerifyTypeEnum.resetPassword }
  });
}

export function resetPassword(params: {
  pwd: string; //用户密码
  emailAccount: string;
  code: string; //验证码
}) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/account/patient/account/email/update/pwd/verify`,
    method: 'POST',
    data: params
  });
}
