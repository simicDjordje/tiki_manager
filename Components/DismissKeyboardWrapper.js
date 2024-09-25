import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const DismissKeyboardWrapper = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>     
        {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardWrapper;