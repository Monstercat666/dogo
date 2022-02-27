import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';
import Fonts from '../../../styles/Fonts';

export const Styles = StyleSheet.create({
  container: {backgroundColor: Colors.Background, flex: 1},
  activityIndicatorStyle: {marginTop: '60%'},
  noMasterBreedTextStyle: {
    marginTop: '60%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: Fonts.Medium,
    color: Colors.Blue,
  },
});
