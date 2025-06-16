import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

const Loading = (props: { text?: string }) => {
  // 创建一个 Animated.Value 用于控制旋转动画
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // 配置动画，让图片无限循环旋转
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1500, // 旋转一圈的时间，单位为毫秒
        easing: t => t, // 线性缓动函数，使旋转速度均匀
        useNativeDriver: true // 使用原生驱动以提高性能
      })
    ).start();
  }, []);

  // 插值函数，将 0 到 1 的动画值映射为 0 到 360 度的旋转角度
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.overlay}>
      <Animated.Image
        source={require('@/assets/images/loading-icon.png')} // 加载图片的 URL，可替换为自己的图片
        style={[
          styles.loadingImage,
          {
            transform: [{ rotate: rotateInterpolate }]
          }
        ]}
      />
      {props.text && <ThemedText>{props.text}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明黑色背景
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000 // 确保蒙层在最上层
  },
  loadingImage: {
    width: 40,
    height: 40,
    marginBottom: 8
  }
});

export default Loading;
