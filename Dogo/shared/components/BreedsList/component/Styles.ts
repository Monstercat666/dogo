import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';
import Fonts from '../../../styles/Fonts';
import Spacings from '../../../styles/Spacings';

const Styles = StyleSheet.create({
  masterSectionContainer: {
    padding: Spacings.Small,
    backgroundColor: Colors.GreenDark,
  },
  divider: {marginBottom: 2},
  masterSectionTextStyle: {
    fontSize: Fonts.Medium,
    color: Colors.White,
  },
  subSectionContainer: {
    paddingVertical: Spacings.Small,
    backgroundColor: Colors.GreenLight,
    paddingRight: Spacings.Small,
    paddingLeft: Spacings.Standard,
  },
  subSectionTextStyle: {
    fontSize: Fonts.Medium,
    color: Colors.White,
  },
});

export default Styles;
