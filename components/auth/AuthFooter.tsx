import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import ImageIcon from '../ui/ImageIcon';

interface Props {
  withRadio?: boolean;
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange?: (e: any) => void;
}

export default function AuthFooter(props: Props) {

  const { style, withRadio, checked, onChange } = props;
  return (
    <View style={[styles.footer, style]}>
      {!!withRadio &&
        (checked ? (
          <ImageIcon size={24} source={require('@/assets/images/checked-active-icon.png')} onPress={() => onChange && onChange(false)} />
        ) : (
          <ImageIcon size={24} source={require('@/assets/images/unchecked-icon.png')} onPress={() => onChange && onChange(true)} />
        ))}
      <View style={[styles.content, withRadio ? { justifyContent: 'flex-start' } : { justifyContent: 'center' }]}>
        <ThemedText style={styles.footerText}>You agree to our</ThemedText>
        <TouchableOpacity
          onPress={() => {
            // router.push(`/about-us/detail?typeDc=${PlatformServiceTermsEnum.ServiceAgreement}`);
          }}
        >
          <ThemedText style={styles.footerLink}> Service Agreement </ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.footerText}> and </ThemedText>
        <TouchableOpacity
          onPress={() => {
            // router.push(`/about-us/detail?typeDc=${PlatformServiceTermsEnum.PrivacyPolicy}`);
          }}
        >
          <ThemedText style={styles.footerLink}> Privacy Policy </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    marginHorizontal: 32
  },
  radio: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.30)',
    fontSize: 12
  },
  footerLink: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 12
  }
});
