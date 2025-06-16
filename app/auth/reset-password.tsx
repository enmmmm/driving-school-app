// import { ImageBackground, StyleSheet, useColorScheme, Keyboard, TouchableWithoutFeedback } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ThemedText } from '@/components/ThemedText';
// import NavigationHeader from '@/components/ui/NavigationHeader';
// import ImageIcon from '@/components/ui/ImageIcon';
// import { useRef, useState } from 'react';
// import { router } from 'expo-router';
// import AuthEmail from '@/components/auth/AuthEmail';
// import AuthPassword from '@/components/auth/AuthPassword';
// import AuthSuccess from '@/components/auth/AuthSuccess';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTranslation } from 'react-i18next';
// import { checkAccount, checkVerifyCode, getVerifyCode, resetPassword } from '@/apis/auth/reset-password';

import { StyleSheet } from "react-native";

// export const STORAGE_RESET_PASSWORD_KEY = 'RESET_PASSWORD_VERIFY_CODE';
// export const VERIFICATION_CODE_EXPIRY = 1800000; // 验证码有效期 30分钟

export default function ResetPasswordScreen() {
//   const { t } = useTranslation();

//   const [verifySuccess, setVerifySuccess] = useState(false); // 邮箱验证码验证成功
//   const [signupSuccess, setSignupSuccess] = useState(false); // 密码设置成功

//   const emailAccount = useRef<string>();
//   const verifyCode = useRef<string>();

//   const theme = useColorScheme() ?? 'light';

//   const isCodeExpired = (time: string) => {
//     const now = new Date().getTime();
//     const diff = now - parseInt(time);
//     return diff > VERIFICATION_CODE_EXPIRY;
//   };

//   // 30分钟内是否验证过验证码
//   const getVerifyCodeFromStorage = async (email: string) => {
//     try {
//       const res = await AsyncStorage.getItem(STORAGE_RESET_PASSWORD_KEY);
//       if (res) {
//         const parsedCodeInfo = JSON.parse(res);
//         if (parsedCodeInfo) {
//           const { email: storedEmail, code, time } = parsedCodeInfo;
//           if (storedEmail === email) {
//             if (isCodeExpired(time)) {
//               await AsyncStorage.removeItem(STORAGE_RESET_PASSWORD_KEY);
//             } else {
//               return code;
//             }
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error getting verify code from storage:', error);
//     }
//     return null;
//   };

//   const sendVerifyCode = async (email: string) => {
//     await getVerifyCode(email);
//   };

//   const checkEmailAccount = async (email: string) => {
//     await checkAccount(email);
//     // 30分钟内验证码有效
//     const storageCode = await getVerifyCodeFromStorage(email);
//     if (storageCode) {
//       emailAccount.current = email;
//       verifyCode.current = storageCode;
//       setVerifySuccess(true);
//     }
//   };

//   const onVerify = async (email: string, code: string) => {
//     await checkVerifyCode({
//       emailAccount: email,
//       code
//     });
//     emailAccount.current = email;
//     verifyCode.current = code;
//     AsyncStorage.setItem(
//       STORAGE_RESET_PASSWORD_KEY,
//       JSON.stringify({
//         email,
//         code,
//         time: new Date().getTime().toString()
//       })
//     );
//     setVerifySuccess(true);
//   };

//   const onResetPassword = async (password: string) => {
//     await resetPassword({ pwd: password, emailAccount: emailAccount.current!, code: verifyCode.current! });
//     setSignupSuccess(true);
//   };

//   return (
//     <ImageBackground source={require('@/assets/images/me-background.png')} style={styles.container}>
//       <TouchableWithoutFeedback
//         onPress={() => {
//           Keyboard.dismiss();
//         }}
//       >
//         <SafeAreaView style={{ flex: 1 }}>
//           <NavigationHeader
//             headerLeft={
//               <ImageIcon size={24} source={require('@/assets/images/header-arrow-left-icon.png')} onPress={() => router.back()} />
//             }
//           />
//           <ThemedText type='title' style={styles.title}>
//             {t('Reset password')}
//           </ThemedText>
//           {signupSuccess ? (
//             <AuthSuccess text={t('The password has been successfully modified')} />
//           ) : verifySuccess ? (
//             <AuthPassword onSubmit={onResetPassword} />
//           ) : (
//             <AuthEmail checkEmailAccount={checkEmailAccount} sendVerifyCode={sendVerifyCode} onSubmit={onVerify} />
//           )}
//         </SafeAreaView>
//       </TouchableWithoutFeedback>
//     </ImageBackground>
//   );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  title: {
    marginTop: 64,
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 48,
    textAlign: 'center',
    marginBottom: 24
  }
});
