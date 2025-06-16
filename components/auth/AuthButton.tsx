import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Props extends ViewProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
  onPress: () => void;
}

export default function AuthButton(props: Props) {
  if (props.disabled) {
    return (
      <LinearGradient
        colors={['rgba(255, 61, 59, 0.5)', 'rgba(255, 130, 50, 0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.disabledWrapper, props.style]}
      >
        <ThemedText style={styles.disabledButton}>{props.title}</ThemedText>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient colors={['#FF8232', '#FF3D3B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.wrapper, props.style]}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <ThemedText>{props.title}</ThemedText>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 32, height: 48, borderRadius: 30 },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledWrapper: {
    marginHorizontal: 32,
    height: 48,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    lineHeight: 48
  }
});
