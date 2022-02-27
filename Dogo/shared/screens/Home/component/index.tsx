import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {BreedsList} from '../../../components/BreedsList/container';
import {Filter} from '../../../components/Filter/container';
import {Styles} from './Styles';
import Colors from '../../../styles/Colors';
import {FilteredBreedsMap} from '../../../util/Types';

interface Props {
  filterFormattedBreedsMap?: FilteredBreedsMap;
  filterBreeds: (input?: string) => void;
}

export const HomeComponent: React.FC<Props> = props => {
  const {filterFormattedBreedsMap, filterBreeds} = props;
  return (
    <View style={Styles.container}>
      {filterFormattedBreedsMap ? (
        <>
          <Filter onChange={filterBreeds} />
          <BreedsList breeds={filterFormattedBreedsMap} />
        </>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={Colors.Blue}
          style={Styles.activityIndicatorStyle}
        />
      )}
    </View>
  );
};
