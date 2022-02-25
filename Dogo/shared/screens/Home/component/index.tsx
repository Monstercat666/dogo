import * as React from 'react';
import {Text, View} from 'react-native';
import {Filter} from '../../../components/Filter/container';
import Colors from '../../../styles/Colors';
import {AllBreeds} from '../container';
import {Styles} from './Styles';

export interface Props {
  allBreeds?: AllBreeds;
}

export const HomeComponent: React.FC<Props> = props => {
  const {allBreeds} = props;

  return (
    <View style={Styles.container}>
      <Filter onChange={() => {}} />
    </View>
  );
};
