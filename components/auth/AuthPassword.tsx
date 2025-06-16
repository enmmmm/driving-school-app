import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import { ThemedText } from '@/components/ThemedText';
import { passwordRegex, validatePassWord } from '@/utils/auth';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

interface Props {
  buttonTitle?: string;
  onSubmit: (password: string) => void;
}

export default function AuthPassword(props: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onPressSignup = async () => {
    if (password !== confirmPassword) {
      Toast.show('Password mismatch', {
        position: Toast.positions.CENTER
      });
      return;
    }
    await validatePassWord(password);
    props.onSubmit && props.onSubmit(password);
  };

  return (
    <View style={styles.container}>
      <AuthInput
        icon={require('@/assets/images/lock-icon.png')}
        placeholder='Enter password'
        value={password}
        onChangeText={setPassword}
        withEyeIcon
        secureTextEntry
      />
      <AuthInput
        icon={require('@/assets/images/lock-icon.png')}
        placeholder='Confirm password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        withEyeIcon
        secureTextEntry
      />
      <ThemedText style={styles.passwordTip}>
        Tips：Must be 8-20 English letters, numbers or characters, including at least two
      </ThemedText>
      {password && !passwordRegex.test(password) ? (
        <ThemedText style={styles.passwordErrorTip}>Password format error</ThemedText>
      ) : password && confirmPassword && password !== confirmPassword ? (
        <ThemedText style={styles.passwordErrorTip}>Passwords do not match. Please confirm.</ThemedText>
      ) : null}

      <AuthButton
        disabled={!passwordRegex.test(password) || !passwordRegex.test(confirmPassword) || password !== confirmPassword}
        title={props.buttonTitle || 'Next step'}
        onPress={onPressSignup}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32
  },
  passwordTip: {
    marginHorizontal: 32,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.30)'
  },
  passwordErrorTip: {
    fontSize: 14,
    textAlign: 'center',
    color: '#C33535',
    marginTop: 12
  }
});
