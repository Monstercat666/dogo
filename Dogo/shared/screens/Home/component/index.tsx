import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {BreedsList} from '../../../components/BreedsList/container';
import {Filter} from '../../../components/Filter/container';
import {Styles} from './Styles';
import Colors from '../../../styles/Colors';
import {FilteredBreedsMapWithFlag} from '../../../util/Types';
import strings from '../../../localization/Localization';
import {Sort} from '../../../components/Sort/Sort';

interface Props {
  filterFormattedBreedsMapWithFlag?: FilteredBreedsMapWithFlag;
  filterBreeds: (input?: string) => void;
}

export const HomeComponent: React.FC<Props> = props => {
  const {filterFormattedBreedsMapWithFlag, filterBreeds} = props;

  return (
    <View style={Styles.container}>
      {filterFormattedBreedsMapWithFlag ? (
        <>
          <Filter onChange={filterBreeds} />

          {filterFormattedBreedsMapWithFlag.isSomeBreedDisplayed === false ? (
            <Text style={Styles.noMasterBreedTextStyle}>
              {strings.noMasterBreed}
            </Text>
          ) : (
            <>
              <Sort
                handleAscendingSorting={() => {}}
                handleDescendingSorting={() => {}}
              />
              <BreedsList
                breeds={filterFormattedBreedsMapWithFlag.filteredBreedsMap}
              />
            </>
          )}
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
