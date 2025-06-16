import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import VerifyCode from '@/components/auth/VerifyCode';
import ImageIcon from '@/components/ui/ImageIcon';
import { emailRegex, validateEmail } from '@/utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

export const STORAGE_KEY = 'EMAIL_VERIFY_TIME';

interface Props {
  email?: string;
  emailDisabled?: boolean;
  checkEmailAccount?: (email: string) => Promise<void>;
  sendVerifyCode: (email: string) => Promise<void>;
  onSubmit: (email: string, verifyCode: string) => void;
}

export default function AuthEmail(props: Props) {
  const [email, setEmail] = useState(props.email ?? '');
  const [verifyInput, setVerifyInput] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');

  React.useEffect(() => {
    init();
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const init = async () => {
    if (props.email) {
      if (props.checkEmailAccount) {
        await props.checkEmailAccount(email);
      }
      setVerifyInput(true);
    }
  };

  const onPressVerify = async () => {
    Keyboard.dismiss();
    await validateEmail(email);
    if (!verifyInput) {
      if (props.checkEmailAccount) {
        await props.checkEmailAccount(email);
      }
      setVerifyInput(true);
    } else {
      if (verifyInput && !verifyCode) {
        Toast.show('Please enter the verification code.', {
          position: Toast.positions.CENTER
        });
        return;
      }
      props.onSubmit && (await props.onSubmit(email, verifyCode));
      clear();
    }
  };

  const clear = () => {
    setEmail('');
    setVerifyInput(false);
    setVerifyCode('');
  };

  return (
    <View style={styles.container}>
      <AuthInput
        icon={require('@/assets/images/email-icon.png')}
        placeholder='Please enter your email address'
        value={email}
        onChangeText={setEmail}
        endNode={emailRegex.test(email) ? <ImageIcon size={24} source={require('@/assets/images/success-icon.png')} /> : null}
        keyboardType='email-address'
        editable={props.emailDisabled || verifyInput ? false : true}
      />
      {verifyInput && (
        <AuthInput
          wrapperStyle={{ marginBottom: 0 }}
          icon={require('@/assets/images/key-icon.png')}
          placeholder='Verification code'
          value={verifyCode}
          onChangeText={setVerifyCode}
          endNode={<VerifyCode storageKey={STORAGE_KEY} onSend={() => props.sendVerifyCode(email)} />}
        />
      )}
      <AuthButton
        disabled={!email?.trim() || (verifyInput && !verifyCode?.trim())}
        title='Next step'
        onPress={onPressVerify}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32
  }
});
