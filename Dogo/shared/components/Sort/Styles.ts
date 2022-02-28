import {StyleSheet} from 'react-native';
import Spacings from '../../styles/Spacings';

const Styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'center'},
  svgContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    marginBottom: Spacings.Small,
  },
});

export default Styles;
