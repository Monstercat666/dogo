import * as React from 'react';
import {View} from 'react-native';
import {BreedsList} from '../../../components/BreedsList/container';
import {Filter} from '../../../components/Filter/container';
import {MasterAndSubBreeds} from '../../../util/Functions';
import {Styles} from './Styles';

export interface Props {
  allBreeds?: MasterAndSubBreeds;
}

export const HomeComponent: React.FC<Props> = props => {
  const {allBreeds} = props;

  return (
    <View style={Styles.container}>
      <Filter onChange={() => {}} />
      <BreedsList breeds={allBreeds} />
    </View>
  );
};
