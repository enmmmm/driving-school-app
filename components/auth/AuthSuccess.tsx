import AuthButton from '@/components/auth/AuthButton';
import { router } from 'expo-router';
import { View, Image, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useTranslation } from 'react-i18next';

export default function AuthSuccess(props: { text?: string; buttonTitle?: string; onPress?: () => void }) {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} source={require('@/assets/images/success.png')} />
      <ThemedText style={styles.text}>{props.text || t('Succcessfully')!}</ThemedText>
      <AuthButton
        title={props.buttonTitle || t('Back to login')}
        onPress={() => {
          if (props.onPress) {
            props.onPress();
          } else {
            router.back();
          }
        }}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 44
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: 'bold'
  }
});
