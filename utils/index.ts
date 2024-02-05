import Clipboard from '@react-native-clipboard/clipboard';
import { ToastAndroid } from 'react-native';

const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
};

const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

export { copyToClipboard, showToast };
