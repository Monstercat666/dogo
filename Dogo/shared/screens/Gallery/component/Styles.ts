import {StyleSheet} from 'react-native';
import Spacings from '../../../styles/Spacings';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacings.Large,
    paddingVertical: Spacings.Medium,
  },
  contentContainer: {flex: 1},
  firstImage: {height: '40%', marginBottom: Spacings.Small},
  secondImage: {height: '40%', marginBottom: Spacings.Small},
  activityIndicatorStyle: {marginTop: '60%'},
});

export default Styles;
