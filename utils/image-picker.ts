import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import { fileUpload } from '@/apis/feedback';
import i18n from 'i18next';

const { t } = i18n;
export async function showCamera() {
  if (Platform.OS !== 'web') {
    const status = await ImagePicker.requestCameraPermissionsAsync();
    if (status.status !== 'granted') {
      Toast.show(t('No camera permission'), {
        position: Toast.positions.CENTER
      });
      return;
    }
  }
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    // allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });
  console.log(result);
  if (result.canceled) return Promise.reject();
  return result;
}

export async function showLibrary() {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.show(t('No photo album permission'), {
        position: Toast.positions.CENTER
      });
      return;
    }
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    // allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });
  console.log(result);
  if (result.canceled) return Promise.reject();
  return result;
}

export async function uploadFile(result: ImagePicker.ImagePickerResult) {
  if (!result?.assets) return;
  return await fileUpload({ uri: result.assets[0].uri, name: result.assets[0].fileName || 'default.png' });
}
