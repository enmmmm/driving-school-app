import AuthButton from '@/components/auth/AuthButton';
import AuthFooter from '@/components/auth/AuthFooter';
import AuthInput from '@/components/auth/AuthInput';
import SignInBanner from '@/components/auth/SignInBanner';
import Loading from '@/components/Loading';
import { ThemedText } from '@/components/ThemedText';
import ImageIcon from '@/components/ui/ImageIcon';
import NavigationHeader from '@/components/ui/NavigationHeader';
import useUserStore from '@/stores/useUserStore';
import { showAuthToast, validateEmail, validatePassWord } from '@/utils/auth';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useState } from 'react';
import { Animated, ImageBackground, Keyboard, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {

  const theme = useColorScheme() ?? 'light';

  const [authAgree, setAuthAgree] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const marginTopValue = useState(new Animated.Value(260))[0];

  const optionList = [
    {
      id: 'wexin',
      title: '微信登录',
      icon: 'google',
      onPress: async () => {
        setLoading(true);
        try {

        } catch (error: any) {
        } finally {
          setLoading(false);
        }
      }
    },
    {
      id: 'phone',
      title: '一键登录',
      icon: 'apple',
      onPress: async () => {
        setLoading(true);
        try {

        } catch (error) {
          console.error('Apple sign-in failed:', error);
        } finally {
          setLoading(false);
        }
      }
    },
  ];

  useFocusEffect(
    useCallback(() => {
      console.log('SignInScreen focused');
      const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
      const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
      return () => {
        console.log('SignInScreen unfocused');
        handleKeyboardHide();
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, [])
  );

  const handleKeyboardShow = () => {
    setIsKeyboardVisible(true);
    Animated.timing(marginTopValue, {
      toValue: 50,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
    Animated.timing(marginTopValue, {
      toValue: 260,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const onSignin = async () => {
    await validateEmail(email);
    await validatePassWord(password);
    if (!authAgree) {
      return showAuthToast();
    }
    console.log('emailLogin', email, password);
    Keyboard.dismiss();
    const { emailLogin } = useUserStore.getState();
    await emailLogin({ pwd: password, emailAccount: email });
    router.back();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/me');
    }
  };

  const onSignup = () => {
    console.log('signup');
    Keyboard.dismiss();
    // router.push('/auth/sign-up');
  };

  const onResetPassword = () => {
    console.log('reset password');
    Keyboard.dismiss();
    router.push('/auth/reset-password');
  };
  const authAgreeChange = (value: boolean) => {
    console.log('authAgreeChange value:', value);
    setAuthAgree(value);
  };

  // return ( 
  //   <View>
  //     <Text  style={styles.title}>登录</Text>
  //   </View>
  // );

  return (
    <ImageBackground source={require('@/assets/images/partial-react-logo.png')} style={styles.container}>
      <ScrollView>
        {/* <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} /> */}

        <SignInBanner showDot={!isKeyboardVisible} />
        <NavigationHeader
          headerLeft={<ImageIcon size={24} source={require('@/assets/images/header-arrow-left-icon.png')} onPress={() => router.back()} />}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            style={{
              position: 'relative',
              width: '100%',
              marginTop: marginTopValue
            }}
          >
            <ThemedText style={styles.title}>Sign in</ThemedText>
            <AuthInput
              // icon={require('@/assets/images/email-icon.png')}
              placeholder='Please enter your email address'
              value={email}
              onChangeText={setEmail}
            />
            <AuthInput
              // icon={require('@/assets/images/lock-icon.png')}
              placeholder='Password'
              secureTextEntry
              withEyeIcon={true}
              value={password}
              onChangeText={setPassword}
            />
            <AuthButton disabled={!email?.trim() || !password?.trim()} title='Sign in' onPress={onSignin} />
            <View style={styles.signupContainer}>
              <TouchableOpacity onPress={onResetPassword}>
                <ThemedText>Unable to log in?</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSignup}>
                <ThemedText style={styles.signupText}>Sign up</ThemedText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>

        <View>
          <Text>第三方登录</Text>
          <View style={styles.moreOptionContainer}>
            {optionList.map(item => {
              if (item.id === 'apple' && Platform.OS !== 'ios') {
                return null;
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (!authAgree) {
                      return showAuthToast();
                    }
                    item.onPress();
                  }}
                  key={item.title}
                  style={styles.option}
                >
                  <FontAwesome5 name={item.icon} size={24} color='#ffffff' />
                  <ThemedText style={{fontSize: 16}}>{item.title}</ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <AuthFooter withRadio checked={authAgree} style={{ marginVertical: 40 }} onChange={value => setAuthAgree(value)} />
      </ScrollView>
      {loading && <Loading text={'fetching your data, please wait'} />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: 212,
    height: 123,
    marginTop: 117,
    marginBottom: 48,
    alignSelf: 'center'
  },
  option: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 48,
    marginHorizontal: 32,
    marginBottom: 24,
    paddingHorizontal: 32,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.20)',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  divider: {
    marginTop: 40,
    marginBottom: 24,
    marginHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center'
  },
  dividerLine: {
    flex: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.60)',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 12
  },
  moreOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreOptionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 40,
    marginHorizontal: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.20)',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#141414',
  //   position: 'relative'
  // },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 48,
    textAlign: 'center',
    marginBottom: 24
  },
  signupContainer: {
    marginTop: 14,
    marginHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  signupText: {
    fontSize: 14,
    color: '#EF7725'
  }
});
