/**
 * 分辨率视频路径
 * @param url
 * @param resolution
 * @param isVip
 */
export default function resolutionVideoPath(url: string, resolution: string, isVip: boolean ) {
  if(resolution){
    switch (resolution) {
      case 'auto':
        return isVip ? modifyVideoUrl(url, 'auto') : modifyVideoUrl(url, '540');
      case '360P':
        return modifyVideoUrl(url, '360');
      case '480P':
        return modifyVideoUrl(url, '480');
      case '540P':
        return modifyVideoUrl(url, '540');
      case '720P':
        return modifyVideoUrl(url, '720');
      case '1080P':
        return modifyVideoUrl(url, '1080');
    }

  }else {
    return url;
  }
}

function modifyVideoUrl(originalUrl: string, quality: string) {
  if(originalUrl && originalUrl.includes('uploads/video')){
    const baseUrl = originalUrl?.split('uploads/video')[0];
    const videoId = originalUrl?.split('?')?.[0]?.split('/')?.pop()?.split('.')[0];
    return quality === 'auto'
      ? `${baseUrl}transcoded/hls/${videoId}.m3u8`
      : `${baseUrl}transcoded/hls/${videoId}-hls${quality}.m3u8`;
  }else {
    return originalUrl;
  }
}
