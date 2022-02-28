import React from 'react';
import {FlatList} from 'react-native';
import {Props} from '../container';
import {MasterSection} from './MasterSection';
import Styles from './Styles';

export const BreedsListComponent: React.FC<Props> = props => {
  const {breeds, isDesc} = props;

  return (
    <FlatList
      keyExtractor={breed => breed.name}
      data={isDesc ? breeds.reverse() : breeds}
      renderItem={({item}) => {
        return (
          <MasterSection masterBreed={item} containerStyle={Styles.divider} />
        );
      }}
    />
  );
};
