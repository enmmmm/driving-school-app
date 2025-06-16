import Toast from 'react-native-root-toast';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import useUserStore from '../../stores/useUserStore';

const languageHeaderMapping = {
  zh: 'zh-CN,zh;q=0.9,ak;q=0.8',
  en: 'en-US,en;q=0.9,ak;q=0.8',
  ar: 'ar-SA,ar;q=0.9,ak;q=0.8',
  es: 'es-ES,es;q=0.9,ak;q=0.8'
};

const request = async option => {
  if (!option.method) {
    option.method = 'GET';
  }
  // 如果request请求为GET请求，且传入了data属性，需要把data转为query参数
  if (option.method === 'GET' && option.data) {
    // eslint-disable-next-line no-undef
    const queryString = new URLSearchParams(option.data).toString();
    // 检查url是否已经包含查询参数
    option.url = option.url.includes('?') ? `${option.url}&${queryString}` : `${option.url}?${queryString}`;
    delete option.data;
  }
  option.header = {
    'Content-Type': 'application/json',
    ...option.header
  };

  const { accessToken, userInfo, language, logout, setLogoutModal } = useUserStore.getState();
  if (accessToken) {
    option.header['X-Auth-Token'] = accessToken;
    if (userInfo && userInfo.id) {
      option.header['X-User-Id'] = userInfo.id;
    }
  }
  if (!option.header['Accept-Language'] && language) {
    option.header['Accept-Language'] = languageHeaderMapping[language];
  }
  const headers = option;
  // TODO 请求加密
  return fetch(option.url, {
    method: option.method,
    headers,
    body: option.data && option.method !== 'GET' ? (option.data instanceof FormData ? option.data : JSON.stringify(option.data)) : null
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      // TODO 响应解密
      console.log(option.url, res);
      return res;
    })
    .then(data => {
      // 异常判断
      const { success, code, message } = data;
      if (!success && code === 10020013) {
        logout();
        setLogoutModal(true);
        return Promise.reject(data);
      }
      if (!success) {
        Toast.show(message, {
          position: Toast.positions.CENTER
        });
        return Promise.reject(data);
      }
      return data;
    })
    .then(res => {
      // 响应去包装
      if (!option.wrapped) {
        return res?.data;
      }
      return res;
    });
};

const useRequest = (option, fetcher, config) => {
  const { language } = useUserStore();

  if (option) {
    option.header = {
      ...option.header,
      'Accept-Language': languageHeaderMapping[language]
    };
  }

  let key = option && JSON.stringify(option);
  // if (key && option.persist) {
  //   key = swrCache.persistedKey(key);
  // }
  return useSWR(key, fetcher || (() => request(option)), config);
};

const PAGE_SIZE = 20;

const usePageRequest = (option, config) => {
  const { url, size: _size, data: _data } = option;

  const getKey = page => `${url}?page=${page}&size=${_size || PAGE_SIZE}&${_data && JSON.stringify(_data)}`;

  const fetcher = _url => request({ ...option, url: _url?.split('&').slice(0, -1).join('&'), wrapped: false });

  const {
    data: dataList,
    error,
    size,
    setSize,
    mutate,
    isLoading,
    isValidating
  } = useSWRInfinite(getKey, fetcher, { revalidateFirstPage: false, revalidateOnMount: true, ...config });

  const isLast = dataList?.[dataList.length - 1]?.last ?? true;
  const totalElements = dataList?.[0]?.totalElements;
  const allData = dataList?.map(item => item?.models || []).flat();

  const loadMore = () => {
    if (isLoading || isLast) return;
    setSize(size + 1);
  };

  return {
    data: allData,
    totalElements,
    loadMore,
    error,
    mutate,
    isLoading,
    isValidating,
    isLast
  };
};

export { request, useRequest, usePageRequest };
