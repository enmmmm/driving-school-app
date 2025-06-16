import useUserStore from '@/stores/useUserStore';
import React, { useState } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import ImageIcon from '../ui/ImageIcon';

interface Props extends TextInputProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  icon?: ImageSourcePropType;
  withEyeIcon?: boolean;
  endNode?: React.ReactNode;
}

export default function AuthInput(props: Props) {
  const { value, icon, withEyeIcon, secureTextEntry, endNode, editable = true, ...rest } = props;
  const [showPassword, setShowPassword] = useState<boolean>();
  const language = useUserStore(state => state.language);

  return (
    <View style={[styles.wrapper, props.wrapperStyle]}>
      {!!icon && <ImageIcon source={icon} size={24} />}
      {editable ? (
        <TextInput
          style={[styles.input, { textAlign: language === 'ar' ? 'right' : 'left' }]}
          value={value}
          placeholderTextColor='rgba(255, 255, 255, 0.3)'
          {...rest}
          secureTextEntry={secureTextEntry && !showPassword}
        />
      ) : (
        <View style={styles.disabledContainer}>
          <ThemedText style={styles.disabledText}>{value}</ThemedText>
        </View>
      )}
      {!!withEyeIcon &&
        (showPassword ? (
          <ImageIcon source={require('@/assets/images/eye-icon.png')} size={24} onPress={() => setShowPassword(false)} />
        ) : (
          <ImageIcon source={require('@/assets/images/eye-off-icon.png')} size={24} onPress={() => setShowPassword(true)} />
        ))}
      {!!endNode && endNode}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginHorizontal: 32,
    marginBottom: 24,
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    borderStyle: 'solid',
    borderWidth: 1
  },
  input: { color: 'white', fontSize: 14, paddingHorizontal: 8, flex: 1, height: '100%' },
  disabledContainer: {
    paddingHorizontal: 8,
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  disabledText: {
    color: 'white',
    fontSize: 14
  }
});
