import { Redirect } from 'expo-router';

export default function Index() {
  // 直接重定向到登录页
  return <Redirect href="/auth/login" />;
}