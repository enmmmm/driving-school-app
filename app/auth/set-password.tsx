import { ImageBackground, Keyboard, StyleSheet, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ThemedText } from '@/components/ThemedText';
import ImageIcon from '@/components/ui/ImageIcon';
import NavigationHeader from '@/components/ui/NavigationHeader';
// import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
// import AuthEmail, { STORAGE_KEY } from '@/components/auth/AuthEmail';
import AuthPassword from '@/components/auth/AuthPassword';
// import AuthSuccess from '@/components/auth/AuthSuccess';
// import AuthFooter from '@/components/auth/AuthFooter';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTranslation } from 'react-i18next';
// import { checkVerifyCode, getVerifyCode, resetPassword } from '@/apis/auth/reset-password';
// import { VerifyTypeEnum } from '@/apis/auth/sign-up';
// import Toast from 'react-native-root-toast';
import { setPassword } from '@/apis/setting';

export default function SetPasswordScreen() {
  const params = useLocalSearchParams<{ emailAccount: string }>();

  const theme = useColorScheme() ?? 'light';

  const onSetPassword = async (password: string) => {
    await setPassword({
      pwd: password,
      emailAccount: params.emailAccount
    });
    router.back();
  };

  return (
    <ImageBackground source={require('@/assets/images/me-background.png')} style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationHeader
            headerLeft={
              <ImageIcon size={24} source={require('@/assets/images/header-arrow-left-icon.png')} onPress={() => router.back()} />
            }
          />
          <AuthPassword onSubmit={onSetPassword} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
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
