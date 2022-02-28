import {StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';
import Fonts from '../../../styles/Fonts';
import Spacings from '../../../styles/Spacings';

export const Styles = StyleSheet.create({
  container: {backgroundColor: Colors.Background, flex: 1},
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingRight: Spacings.Small,
  },
  filterContainer: {flex: 1},
  sortContainer: {paddingTop: Spacings.xSmall},
  activityIndicatorStyle: {marginTop: '60%'},
  noMasterBreedTextStyle: {
    marginTop: '60%',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: Fonts.Medium,
    color: Colors.Blue,
  },
});
