import { Linking, Platform } from "react-native";

/**
 * 打开YouTube
 */
export const OpenYouTube = async () => {
  // TODO
  const YOUTUBE_CHANNEL_ID = 'YOUR_CHANNEL_ID';
  const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`; // 替换为你的 YouTube 频道 ID
  const YOUTUBE_APP_URL_IOS = `youtube://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`; // iOS YouTube 应用的 URL Scheme
  const YOUTUBE_APP_URL_ANDROID = `intent://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}#Intent;package=com.google.android.youtube;scheme=https;end`; // Android YouTube 应用的 Intent

  try {
    let urlToOpen = YOUTUBE_CHANNEL_URL;

    // 如果设备安装了 YouTube 应用，则优先打开应用
    if (Platform.OS === 'ios') {
      const canOpenApp = await Linking.canOpenURL(YOUTUBE_APP_URL_IOS);
      if (canOpenApp) {
        urlToOpen = YOUTUBE_APP_URL_IOS;
      }
    } else if (Platform.OS === 'android') {
      const canOpenApp = await Linking.canOpenURL(YOUTUBE_APP_URL_ANDROID);
      if (canOpenApp) {
        urlToOpen = YOUTUBE_APP_URL_ANDROID;
      }
    }

    // 打开 YouTube 频道
    await Linking.openURL(urlToOpen);
  } catch (error) {
    console.error('Error opening YouTube channel:', error);
  }
}

export const OpenFacebook = async () => {
  // TODO
  const FACEBOOK_PROFILE_ID = 'YOUR_PAGE_ID_OR_USERNAME'; // Replace with actual ID/username
  const FB_APP_URL_IOS = `fb://profile/${FACEBOOK_PROFILE_ID}`;
  const FB_APP_URL_ANDROID = `intent://www.facebook.com/${FACEBOOK_PROFILE_ID}#Intent;package=com.facebook.katana;scheme=https;end`;
  const FB_WEB_URL = `https://www.facebook.com/${FACEBOOK_PROFILE_ID}`;
  try {
    let urlToOpen = FB_WEB_URL;

    if (Platform.OS === 'ios') {
      const canOpenApp = await Linking.canOpenURL(FB_APP_URL_IOS);
      if (canOpenApp) urlToOpen = FB_APP_URL_IOS;
    } else if (Platform.OS === 'android') {
      const canOpenApp = await Linking.canOpenURL(FB_APP_URL_ANDROID);
      if (canOpenApp) urlToOpen = FB_APP_URL_ANDROID;
    }

    await Linking.openURL(urlToOpen);
  } catch (error) {
    console.error('Error opening Facebook profile:', error);
  }
}

/**
 * 打开tiktok
 */
export const OpenTiktok = async () => {
   // TODO
  const username = '';
  const APP_URL = `tiktok://user?username=${username}`
  const canOpenTiktok = await Linking.canOpenURL(APP_URL);
  if (canOpenTiktok) {
    await Linking.openURL(APP_URL);
  } else {
    return Promise.reject();
  }
}