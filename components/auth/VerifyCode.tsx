import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Props extends ViewProps {
  storageKey: string;
  onSend: () => Promise<void>;
}

export default function VerifyCode(props: Props) {
  const [text, setText] = React.useState('');
  const timer = React.useRef<NodeJS.Timeout>();
  const [loading, setLoading] = React.useState(false);

  const spinValue = React.useRef(new Animated.Value(0)).current; // 初始化旋转值

  React.useEffect(() => {
    init();
    return () => {
      timer.current && clearTimeout(timer.current);
      stopSpinAnimation();
    };
  }, []);

  const init = () => {
    if (!props.storageKey) return;
    AsyncStorage.getItem(props.storageKey)
      .then(times => checkVerifyCodeTime(times))
      .catch(err => {
        console.log('VerifyCode init err', err);
      });
  };

  const checkVerifyCodeTime = (times: string | null) => {
    if (times == null) {
      setText('Send Code');
      return;
    }
    const seconds = Math.floor((new Date().getTime() - Number(times)) / 1000);
    if (seconds >= 0 && seconds < 60) {
      setText(`${60 - seconds}s`);
      timer.current = setTimeout(() => {
        checkVerifyCodeTime(times);
      }, 1000);
    } else {
      setText('Resend');
    }
  };

  const onPress = async () => {
    if (loading) return;
    if (text === 'Send Code' || text === 'Resend') {
      setLoading(true);
      startSpinAnimation();
      try {
        await props?.onSend();
        if (props.storageKey) {
          await AsyncStorage.setItem(props.storageKey, new Date().getTime().toString());
        }
        init();
      } catch (err) {
        console.log('VerifyCode', err);
      } finally {
        setLoading(false);
        stopSpinAnimation();
      }
    }
  };

  // 启动旋转动画
  const startSpinAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ).start();
  };

  // 停止旋转动画
  const stopSpinAnimation = () => {
    spinValue.stopAnimation();
    spinValue.setValue(0);
  };

  // 插值计算旋转角度
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      {loading ? (
        <Animated.Image style={[styles.loading, { transform: [{ rotate: spin }] }]} source={require('@/assets/images/loading-icon.png')} />
      ) : (
        <ThemedText type='link'>{text}</ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  loading: {
    width: 20,
    height: 20
  }
});
