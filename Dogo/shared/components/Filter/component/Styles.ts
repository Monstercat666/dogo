import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';
import Fonts from '../../../styles/Fonts';
import Spacings from '../../../styles/Spacings';

const Styles = StyleSheet.create({
  container: {
    padding: Spacings.Small,
  },
  textInput: {
    borderWidth: 2,
    borderColor: Colors.Grey,
    paddingVertical: Spacings.Small,
    paddingRight: Spacings.Small,
    fontSize: Fonts.Small,
  },
});

export default Styles;
