import { emailLogin, logoff, logout, thirdLogin, touristLogin } from '@/apis/auth/login';
// import { fetchUserInfo, UserInfo } from '@/apis/me';
import { BindInfo, fetchBindInfo } from '@/apis/setting';
// import { Languages } from '@/constants/Languages';
import { EnableDisableEnum, LoginTypeEnum } from '@/enums';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Platform } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { create } from 'zustand';
// import useImStore from './useImStore';

interface LanguageMapping {
  [key: string]: string;
}
export const languageMapping: LanguageMapping = {
  zh: 'zh-cn',
  en: 'en',
  ar: 'ar',
  es: 'es'
};

const STORAGE_TOKEN_KEY = 'STORAGE_TOKEN';
const STORAGE_LANGUAGE_KEY = 'SETTING_LANGUAGE';

interface Device {
  uniqueId: string;
  [key: string]: any;
}

export interface thirdLoginParams {
  authCode: string;
  loginType: LoginTypeEnum;
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
}

interface UserInterface {
  accessToken: string | null;
  tourist: boolean | null; // 是否为游客
  deviceInfo: Device | null; // 设备信息
  // userInfo: UserInfo | null; // 用户信息
  accountInfo: BindInfo[] | null;
  language: string; // 当前语言
  showLogoutModal: boolean;
  unCollectCoins: number; //待领取金币数
  init: () => void;
  // getLanguage: () => void;
  // setLanguage: (lang: string, withRequest?: boolean) => void;
  getDeviceInfo: () => Promise<Device>;
  // getUserInfo: () => Promise<UserInfo | null>;
  getAccountInfo: () => Promise<BindInfo[] | null>;
  touristLogin: () => Promise<string | null>;
  emailLogin: (params: { pwd: string; emailAccount: string }) => Promise<void>;
  thirdLogin: (params: thirdLoginParams) => Promise<void>;
  afterThirdLogin: (data: { accessToken: string; registerFlag: EnableDisableEnum }) => void;
  afterLogin: (data: { accessToken: string; tourist: boolean }) => void;
  clearLoginState: () => void;
  logout: () => Promise<void>;
  logoff: () => Promise<void>;
  setLogoutModal: (show: boolean) => void;
  setUnCollectCoins: (coins: number) => void;
}

const useUserStore = create<UserInterface>((set, get) => ({
  accessToken: null,
  tourist: null,
  deviceInfo: null,
  userInfo: null,
  language: 'en',
  accountInfo: null,
  showLogoutModal: false,
  unCollectCoins: 0,

  init: async () => {
    const { getDeviceInfo, afterLogin } = get();
    // getLanguage();
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      await getDeviceInfo();
      const token = await get().touristLogin();
      if (!token) {
        const storageToken = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
        if (storageToken) {
          afterLogin({ accessToken: storageToken, tourist: false });
        }
      }
    }
  },


  // 设备信息获取
  getDeviceInfo: async () => {
    // const uniqueId = await DeviceInfo.getUniqueId();
    const deviceInfo = { uniqueId: '1' };
    // set(() => ({ deviceInfo }));
    return deviceInfo;
  },

  // 用户信息设置
  getUserInfo: async () => {
    console.log('useUserStore.getUserInfo-----', get().accessToken);
    if (get().accessToken) {
      // const data = await fetchUserInfo();
      // set(() => ({ userInfo: data }));
      // return data;
    }
    // set(() => ({ userInfo: null }));
    return null;
  },

  // 账号绑定信息
  getAccountInfo: async () => {
    if (get().accessToken && !get().tourist) {
      const data = await fetchBindInfo();
      set(() => ({ accountInfo: data }));
      return data;
    }
    set(() => ({ accountInfo: null }));
    return null;
  },

  // 游客登录
  touristLogin: async () => {
    let uniqueId = get()?.deviceInfo?.uniqueId;
    if (!uniqueId) {
      const deviceInfo = await get().getDeviceInfo();
      uniqueId = deviceInfo?.uniqueId;
    }
    const accessToken = await touristLogin(uniqueId);
    if (accessToken) {
      get().afterLogin({ accessToken, tourist: true });
    }
    return accessToken;
  },

  // 邮箱登录
  emailLogin: async (params: {
    pwd: string; //用户密码
    emailAccount: string;
  }) => {
    const uniqueId = get().deviceInfo?.uniqueId;
    const accessToken = await emailLogin({ ...params, loginDevice: uniqueId! });
    const { afterLogin } = get();
    await afterLogin({ accessToken, tourist: false });
  },

  // 三方登录
  thirdLogin: async params => {
    const uniqueId = get().deviceInfo?.uniqueId;
    const result = await thirdLogin({ ...params, loginDevice: uniqueId! });
    const { afterThirdLogin } = get();
    await afterThirdLogin({ accessToken: result.token, registerFlag: result.registerFlag });
  },

  afterLogin: async ({ accessToken, tourist }) => {
    console.log('afterLogin-----', accessToken);
    set(() => ({ accessToken, tourist, userInfo: null }));
    // const data = await fetchUserInfo();
    // if (data.currentTranslate) {
    //   get().setLanguage(data.currentTranslate, false);
    // }
    // set(() => ({ userInfo: data }));
    // console.log('afterLogin-----', data);
    if (!tourist) {
      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, accessToken);
      get().getAccountInfo();
    }
  },

  afterThirdLogin: async ({ accessToken, registerFlag }) => {
    const { afterLogin } = get();
    await afterLogin({ accessToken, tourist: false });
    if (registerFlag === EnableDisableEnum.Enable) {
      // router.replace('/auth/connect-email?registerFlag=1');
    } else {
      router.replace('/me');
    }
  },

  clearLoginState: async () => {
    await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
    set(() => ({ accessToken: null, userInfo: null }));
    // const { destroy } = useImStore.getState();
    // destroy && destroy();
  },

  // 登出
  logout: async () => {
    console.log('logout');
    logout();
    await get().clearLoginState();
  },

  // 注销
  logoff: async () => {
    console.log('logoff');
    await logoff();
    await get().clearLoginState();
  },

  setLogoutModal: (isVisible: boolean) => {
    set(() => ({ showLogoutModal: isVisible }));
  },

  setUnCollectCoins: (coins: number) => {
    set(() => ({ unCollectCoins: coins }));
  }
}));

export default useUserStore;
