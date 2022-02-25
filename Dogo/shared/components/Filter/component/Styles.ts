import {StyleSheet} from 'react-native';
import Fonts from '../../../styles/Fonts';
import Spacings from '../../../styles/Spacings';

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: Spacings.Small,
    borderWidth: 1,
  },
  textInput: {
    borderWidth: 1,
    paddingVertical: Spacings.Small,
    paddingRight: Spacings.Small,
    fontSize: Fonts.Small,
  },
});

export default Styles;
