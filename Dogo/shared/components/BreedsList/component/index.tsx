import React from 'react';
import {FlatList} from 'react-native';
import {Props} from '../container';
import {MasterSection} from './MasterSection';
import Styles from './Styles';

export const BreedsListComponent: React.FC<Props> = props => {
  const {breeds} = props;

  return (
    <>
      <FlatList
        keyExtractor={breed => breed.name}
        data={Array.from(breeds.values())}
        renderItem={({item}) => {
          return (
            <MasterSection mainBreed={item} containerStyle={Styles.divider} />
          );
        }}
      />
    </>
  );
};
