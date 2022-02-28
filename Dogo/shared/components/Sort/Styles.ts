import {StyleSheet} from 'react-native';
import Spacings from '../../styles/Spacings';

const Styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'center'},
  svgContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'transparent',
    marginBottom: Spacings.Small,
  },
});

export default Styles;
