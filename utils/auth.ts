import Toast from 'react-native-root-toast';
// import i18n from 'i18next';

export function showAuthToast() {
  Toast.show('Please read and agree to our Service Agreement and Privacy Policy first.', {
    position: Toast.positions.CENTER
  });
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = new RegExp(
  "^(?:(?=.*[A-Za-z])(?=.*\\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{}|;:',.<>/?`~])|(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{}|;:',.<>/?`~]))[A-Za-z\\d!@#$%^&*()_+\\-=\\[\\]{}|;:',.<>/?`~]{8,20}$"
);
export function validateEmail(email: string) {
  if (!email) {
    Toast.show('Please enter your email address', {
      position: Toast.positions.CENTER
    });
    return Promise.reject();
  }
  if (!emailRegex.test(email)) {
    Toast.show('Email format error', {
      position: Toast.positions.CENTER
    });
    return Promise.reject();
  }
  return Promise.resolve();
}

export function validatePassWord(password: string) {
  if (!password) {
    Toast.show('Please enter the password', {
      position: Toast.positions.CENTER
    });
    return Promise.reject();
  }
  if (!passwordRegex.test(password)) {
    Toast.show('Password format error', {
      position: Toast.positions.CENTER
    });
    return Promise.reject();
  }
  return Promise.resolve();
}
