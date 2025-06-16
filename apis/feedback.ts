import { request, useRequest } from '@/utils';

export function fileUpload(params: { uri: string; name: string }) {
  const { uri, name } = params;
  const file = { uri, name, type: 'multipart/form-data' };
  const formData = new FormData();
  formData.append('source', file as any);
  formData.append('checksum', new Date().getTime() + (Math.random() * 10000000000).toFixed(0));
  formData.append('fileName', name);
  formData.append('platform', 'amazon-s3');
  return request<{ accessUrl: string }>({
    url: `${process.env.EXPO_PUBLIC_API_URL}/fs/swhos/upload`,
    method: 'POST',
    data: formData,
    header: { 'Content-Type': 'multipart/form-data' }
  });
}

export function submit(params: {
  content: string;
  images: string[];
  contactInfo: string;
  processState: number;
  userId: string;
  translateCode: string;
}) {
  return request({
    url: `${process.env.EXPO_PUBLIC_API_URL}/manage/customer/userfeedback/save`,
    method: 'POST',
    data: params
  });
}
