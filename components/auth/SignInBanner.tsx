import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native'; // 添加 TouchableOpacity
import Swiper from 'react-native-swiper';

const BannerHeight = 510;
export default function SignInBanner(props: { showDot?: boolean | undefined }) {
  const { showDot = true } = props;

  const bannerData = [
    { image: require('@/assets/images/login/login-banner1.png') },
    { image: require('@/assets/images/login/login-banner2.png') },
    { image: require('@/assets/images/login/login-banner3.png') }
  ];

  // 添加点击事件处理函数
  const handlePress = (item: any) => {
    console.log('Banner clicked:', item);
  };

  return (
    <View style={styles.wrapper}>
      <Swiper
        autoplay
        dotStyle={!!showDot ? styles.dotStyle : styles.hideDotStyle}
        activeDotStyle={!!showDot ? styles.activeDotStyle : styles.hideDotStyle}
      >
        {bannerData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(item)} style={styles.swiperItem} activeOpacity={0.8}>
            <ImageBackground source={item.image} style={styles.swiperItem}>
              <ImageBackground source={require('@/assets/images/sign-in-background.png')} style={styles.swiperItem}></ImageBackground>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: BannerHeight,
    width: '100%',
    position: 'absolute'
  },
  swiperItem: {
    flex: 1
  },
  dotStyle: {
    width: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    bottom: 156
  },
  activeDotStyle: {
    width: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    bottom: 156
  },
  hideDotStyle: {
    display: 'none'
  }
});
